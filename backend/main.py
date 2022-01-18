from flask import Flask, request, send_file
from OTP import OTP
from Mailing import Mailing
from AuthDB import AuthDB
from UserDB import UserDB
from VoteDB import VoteDB
import hashlib
import os
import datetime
import json

app = Flask(__name__)

@app.route('/newUser', methods=['POST'])
def newUser():
    data = request.form.to_dict()
    firstName = data['FirstName']
    lastName = data['LastName']
    mail = data['Mail']
    groups = data['Groups'].split(',')
    otp = OTP()
    imgName, secret = otp.generateQRCode(mail)
    auth = AuthDB()
    result = auth.AddNewUser(mail, secret)
    if result == False:
        os.remove(imgName)
        return "User exists", 400
    user = UserDB()
    user.AddNewUser(firstName, lastName, mail, groups)
    mailing = Mailing()
    mailing.SendWelcomeEmail(firstName + ' ' + lastName, mail, imgName)
    return "Added new user " + firstName + ' ' + lastName, 201

@app.route('/authorize', methods=['GET'])
def authorize():
    data = request.form.to_dict()
    mail = data['Mail']
    code = data['Code']
    auth = AuthDB()
    secret = auth.GetUserOTPSecret(mail)
    if secret == None:
        return "User not Found", 404
    otp = OTP()
    result = otp.verify(code, secret)
    if result == False:
        return "Wrong OTP Code", 403
    return "Authorized", 200

@app.route('/results', methods=['GET'])
def results():
    data = request.form.to_dict()
    voteNumber = data['VoteNumber']
    vote = VoteDB()
    results = vote.GetVoteResults(voteNumber)
    if results != None:
        return json.dumps(results), 200
    return "Voting not found", 404

@app.route('/userResults', methods=['GET'])
def userResults():
    data = request.form.to_dict()
    voteNumber = data['VoteNumber']
    vote = VoteDB()
    userResults = vote.GetVoteUserResults(voteNumber)
    if userResults == None:
        return "Voting not found", 404
    elif userResults == False:
        return "Voting is not open", 200
    return json.dumps(userResults), 200

@app.route('/addUserToGroup', methods=['PUT'])
def addUserToGroup():
    data = request.form.to_dict()
    mail = data['Mail']
    group = data['Group']
    user = UserDB()
    result = user.AddUserToGroup(mail, group)
    if result == None:
        return "User not Found", 404
    if result == False:
        return "User already in group", 200
    return "Added user " + mail + " to group " + group, 201

@app.route('/newVoting', methods=['POST'])
def newVote():
    data = request.form.to_dict()
    question = data['Question']
    qorum = data['Qorum']
    start = data['Start'].split(' ')
    end = data['End'].split(' ')
    options = data['Options'].split(',')
    entitled = data['Entitled'].split(',')
    votingOpen = data['VotingOpen']
    vote = VoteDB()
    number = vote.GetNewVoteNumber()
    user = UserDB()
    emails = list()
    for group in entitled:
        mails = user.GetGroupUserEmails(group)
        for i in mails:
            if votingOpen == 'true':
                emails.append((i, user.GetUserFirstLastName(i), user.GetUserID(i)))
            else:
                emails.append((i, user.GetUserFirstLastName(i), hashlib.sha512((i + str(number)).encode()).hexdigest()))
    entitledList = list()
    for i in emails:
        if votingOpen == 'true':
            entitledList.append({'id':i[2], 'głosował':'false', 'wybór':''})
        else:
            entitledList.append({'id':i[2], 'głosował':'false'})
    sendEmails(emails)
    optionsList = list()
    for i in options:
        optionsList.append({'wybór':i, 'głosów':0})
    startDate = start[0].split('.')
    startTime = start[1].split(':')
    endDate = end[0].split('.')
    endTime = end[1].split(':')
    startInfo = datetime.datetime(int(startDate[2]), int(startDate[1]), int(startDate[0]), int(startTime[0]), int(startTime[1]))
    endInfo = datetime.datetime(int(endDate[2]), int(endDate[1]), int(endDate[0]), int(endTime[0]), int(endTime[1]))
    vote.AddNewVoting(number, question, qorum, startInfo, endInfo, entitledList, optionsList)
    return "Created new voting", 201

@app.route('/checkVote', methods=['GET'])
def checkVote():
    data = request.form.to_dict()
    voteNumber = data['VoteNumber']
    userID = data['UserID']
    vote = VoteDB()
    status = vote.GetVoteStatus(VoteNumber, userID)
    if status != None:
        return status, 200
    return "Voting not found", 404

@app.route('/addVote', methods=['POST'])
def addVote():
    data = request.form.to_dict()
    voteNumber = data['VoteNumber']
    userID = data['UserID']
    choice = data['Choice']
    vote = VoteDB()
    wynik = ""
    wynik2 = ""
    if vote.IsVoteOpen(voteNumber):
        wynik = vote.AddOpenVote(voteNumber, userID, choice)
    else:
        wynik = vote.AddClosedVote(voteNumber, userID)
        print(wynik)
    if wynik:
        wynik2 = vote.AddChoice(voteNumber, choice)
        if wynik2:
            return "Vote added", 201
        return "User not found", 404
    return "Voting not found", 404

def sendEmails(emails):
    mailing = Mailing()
    for i in emails:
        voting_link = "http://localhost:3000/vote?id=" + str(i[2])
        mailing.SendVotingEmail(i[0], i[1], voting_link)

if __name__ == '__main__':
    app.run()


