from pymongo import MongoClient

class AuthDB:
    def __init__(self):
        self.client = MongoClient(username="admin", password="password", authSource="eVotingPP")
        self.db = self.client.eVotingPP
        self.authentication = self.db.authentication

    def AddNewUser(self, email, otp):
        newUser = {
            "e-mail":email,
            "kod_otp":otp
        }
        user = self.authentication.find_one({"e-mail":email})
        if user == None:
            self.authentication.insert_one(newUser)
            return True
        return False

    def GetUserOTPSecret(self, email):
        user = self.authentication.find_one({"e-mail":email}, {"_id":0, "kod_otp":1})
        if user != None:
            return user['kod_otp']
        return None

    def UpdateUserEmail(self, old_email, new_email):
        user = self.authentication.find_one({"e-mail":old_email})
        if user != None:
            self.authentication.update_one({"_id":user["_id"]}, {"$set": {"e-mail":new_email}})
            return True
        return False
    
    def UpdateUserOTPCode(self, email, new_otp_code):
        user = self.authentication.find_one({"e-mail":email})
        if user != None:
            self.authentication.update_one({"_id":user["_id"]}, {"$set": {"kod_otp":new_otp_code}})
            return True
        return False