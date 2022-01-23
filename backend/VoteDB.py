from pymongo import MongoClient

class VoteDB:
    def __init__(self):
        self.client = MongoClient(username="admin", password="password", authSource="eVotingPP")
        self.db = self.client.eVotingPP
        self.vote = self.db.vote

    def AddNewVoting(self, vote_number, question, kworum, start_time, end_time, entitled, results):
        voting = {
            "nr_głosowania":vote_number,
            "pytanie":question,
            "kworum":kworum,
            "początek":start_time,
            "koniec":end_time,
            "uprawnieni":entitled,
            "wyniki":results
        }
        self.vote.insert_one(voting)

    def AddClosedVote(self, vote_number, user_id):
        voting = self.vote.find_one({"nr_głosowania":vote_number}, {"uprawnieni":1})
        number = 0
        for i in voting['uprawnieni']:
            if i['id'] == user_id:
                test = "uprawnieni." + str(number)
                self.vote.update_one({"_id":voting["_id"]}, {"$set": {test: {"id":user_id, "głosował":True}}})
                return True
            number = number + 1
        return None
    
    def AddOpenVote(self, vote_number, user_id, vote_result):
        voting = self.vote.find_one({"nr_głosowania":vote_number}, {"uprawnieni":1})
        number = 0
        for i in voting['uprawnieni']:
            if i['id'] == user_id:
                value = "uprawnieni." + str(number)
                self.vote.update_one({"_id":voting["_id"]}, {"$set": {value: {"id":user_id, "głosował":True, "wybór":vote_result}}})
                return True
            number = number + 1
        return None

    def AddChoice(self, vote_number, choice):
        voting = self.vote.find_one({"nr_głosowania":vote_number}, {"wyniki":1})
        number = 0
        for i in voting['wyniki']:
            if i['wybór'] == choice:
                value = "wyniki." + str(number)
                actualVotes = i['głosów']
                self.vote.update_one({"_id":voting["_id"]}, {"$set": {value: {"wybór":choice, "głosów":actualVotes + 1}}})
                return True
            number = number + 1
        return None

    def GetActiveVotings(self):
        voting = self.vote.find({}, {"_id":0, "nr_głosowania":1, "pytanie":1, "początek":1, "koniec":1})
        if voting != None:
            return voting
        return None

    def GetVoteResults(self, vote_number):
        voting = self.vote.find_one({"nr_głosowania":vote_number})
        if voting != None:
            return voting['wyniki']
        return None

    def GetVoteStatus(self, vote_number, user_id):
        voting = self.vote.find_one({"nr_głosowania":vote_number})
        for i in voting['uprawnieni']:
            if i['id'] == user_id:
                return i['głosował']
        return None

    def GetVoteUserResults(self, vote_number):
        voting = self.vote.find_one({"nr_głosowania":vote_number})
        if voting != None:
            for i in voting['uprawnieni']:
                if 'wybór' in i:
                    return voting['uprawnieni']
                return False
        return None

    def IsVoteOpen(self, vote_number):
        voting = self.vote.find_one({"nr_głosowania":vote_number})
        if voting != None:
            for i in voting['uprawnieni']:
                if 'wybór' in i:
                    return True
                return False
        return None

    def GetVotingStartTime(self, vote_number):
        voting = self.vote.find_one({"nr_głosowania":vote_number})
        if voting != None:
            return voting['początek']
        return None

    def GetVotingEndTime(self, vote_number):
        voting = self.vote.find_one({"nr_głosowania":vote_number})
        if voting != None:
            return voting['koniec']
        return None
    
    def GetNewVoteNumber(self):
        last = self.vote.find().sort([('_id', -1)]).limit(1)
        number = last[0]['nr_głosowania'].split('/')
        newNumber = number[0] + "/" + str(int(number[1]) + 1)
        return newNumber