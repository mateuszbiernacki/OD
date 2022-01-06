from pymongo import MongoClient

class AdminDB:
    def __init__(self):
        self.client = MongoClient(username="admin", password="password", authSource="eVotingPP")
        self.db = self.client.eVotingPP
        self.admin = self.db.admin

    def AddNewAdmin(self, email, password, otp):
        newAdmin = {
            "e-mail":email,
            "hasło":password,
            "kod_otp":otp
        }
        self.admin.insert_one(newAdmin)

    def GetAdminOTPCode(self, email):
        admin = self.admin.find_one({"e-mail":email}, {"_id":0, "kod_otp":1})
        if admin != None:
            return admin['kod_otp']
        return None

    def GetAdminPassword(self, email):
        admin = self.admin.find_one({"e-mail":email}, {"_id":0, "hasło":1})
        if admin != None:
            return admin['hasło']
        return None

    def UpdateAdminEmail(self, old_email, new_email):
        admin = self.admin.find_one({"e-mail":old_email})
        if admin != None:
            self.admin.update_one({"_id":admin["_id"]}, {"$set": {"e-mail":new_email}})
            return True
        return False

    def UpdateAdminPassword(self, email, new_password):
        admin = self.admin.find_one({"e-mail":email})
        if admin != None:
            self.admin.update_one({"_id":admin["_id"]}, {"$set": {"hasłol":new_password}})
            return True
        return False
    
    def UpdateAdminOTPCode(self, email, new_otp_code):
        admin = self.admin.find_one({"e-mail":email})
        if admin != None:
            self.admin.update_one({"_id":admin["_id"]}, {"$set": {"kod_otp":new_otp_code}})
            return True
        return False