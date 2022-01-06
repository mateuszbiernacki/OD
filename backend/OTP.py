import pyotp
import qrcode
import base64

class OTP:
    def generateQRCode(self, mail):
        base32secret = base64.b32encode(mail.encode('ascii'))
        totp_uri = pyotp.totp.TOTP(base32secret).provisioning_uri(
            mail,
            issuer_name="eVotingPP")

        img = qrcode.make(totp_uri)
        imgName = str(base64.b64encode(mail.encode('ascii'))) + ".png"
        img.save(imgName)
        return imgName, base32secret

    def verify(self, codeToVerify, secret):
        totp = pyotp.TOTP(secret)
        return totp.verify(codeToVerify)