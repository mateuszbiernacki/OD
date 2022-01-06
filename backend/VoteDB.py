from pymongo import MongoClient

class VoteDB:
    def __init__(self):
        self.client = MongoClient(username="admin", password="password", authSource="eVotingPP")
        self.db = self.client.eVotingPP
        self.vote = self.db.vote

    def AddNewVoting(self, vote_number, question, kworum, start_time, end_time, entitled, results):
        voting = {
            "nr_głosowania":vote_number,
            "question":question,
            "kworum":kworum,
            "początek":start_time,
            "koniec":end_time,
            "uprawnieni":entitled,
            "results":results
        }
        self.vote.insert_one(voting)

    def AddVote(self, vote_number, user_id):
        voting = self.vote.find_one({"nr_głosowania":vote_number})
        self.vote.update_one({"_id":voting["_id"]}, {"$set": {"uprawnieni.2": {"id":user_id, "głosował":True}}})
    
    def AddVote(self, vote_number, user_id, vote_result):
        voting = self.vote.find_one({"nr_głosowania":vote_number})
        self.vote.update_one({"_id":voting["_id"]}, {"$set": {"uprawnieni.2": {"id":user_id, "głosował":True, "wybór":vote_result}}})

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