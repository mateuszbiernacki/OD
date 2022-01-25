from pymongo import MongoClient

class UserDB:
    def __init__(self):
        self.client = MongoClient(host="mongodb", port=27017, username="admin", password="password", authSource="eVotingPP")
        self.db = self.client.eVotingPP
        self.user = self.db.user

    def AddNewUser(self, name, last_name, email, groups):
        newUser = {
            "imię":name,
            "nazwisko":last_name,
            "e-mail":email,
            "grupy": groups
        }
        self.user.insert_one(newUser)

    def GetUserID(self, email):
        user = self.user.find_one({"e-mail":email})
        if user != None:
            return user['_id']

    def GetUserFirstLastName(self, email):
        user = self.user.find_one({"e-mail":email}, {"imię":1, "nazwisko":1})
        if user != None:
            return user['imię'] + ' ' + user['nazwisko']
        return None

    def GetUserGroups(self, email):
        user = self.user.find_one({"e-mail":email}, {"grupy":1})
        if user != None:
            return user['grupy']
        return None

    def GetGroupUserEmails(self, group):
        users = self.user.find({"grupy":group}, {"e-mail":1})
        emails = list()
        for i in users:
            emails.append(i["e-mail"])
        if emails != list():
            return emails
        return None

    def UpdateUserEmail(self, old_email, new_email):
        user = self.user.find_one({"e-mail":old_email})
        if user != None:
            self.user.update_one({"_id":user["_id"]}, {"$set": {"e-mail":new_email}})
            return True
        return False

    def AddUserToGroup(self, email, group):
        user = self.user.find_one({"e-mail":email})
        if user != None:
            if group in user["grupy"]:
                return False
            self.user.update_one({"_id":user["_id"]}, {"$push": {"grupy":group}})
            return True
        return None

    def RemoveUserFromGroup(self, email, group):
        user = self.user.find_one({"e-mail":email})
        if user != None:
            self.user.update_one({"_id":user["_id"]}, {"$pull": {"grupy":group}})
            return True
        return False

    def GetAllGroups(self):
        groupsList = list()
        groups = self.user.find({})
        for i in groups:
            for j in i['grupy']:
                if j not in groupsList:
                    groupsList.append(j)
        return groupsList

    def GetAllUsers(self):
        users = self.user.find({}, {"_id", "imię", "nazwisko", "mail", "grupy"})
        return users