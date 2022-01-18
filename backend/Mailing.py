import smtplib, ssl
from email.message import EmailMessage
from email.utils import make_msgid
import mimetypes
import os

class Mailing:
    def __init__(self):
        self.adres = 'evotingpp@gmail.com'
        self.haslo = ''

    def SendWelcomeEmail(self, imie_nazwisko, odbiorca, qr_name):
        msg = EmailMessage()
        msg['Subject'] = 'Witaj w systemie eVotingPP'
        msg['From'] = 'eVotingPP <' + self.adres + '>'
        msg['To'] = imie_nazwisko + ' <' + odbiorca + '>'
        msg.set_content('Zostałeś dodany do systemu eVotingPP. Zeskanuj poniższy kod QR w aplikacji Google Authenticator, aby generować kody logowania do systemu.')
        image_cid = make_msgid(domain='evotingpp.pl')
        msg.add_alternative("""\
        <html>
            <body>
                <p>
                    <h1>Zostałeś dodany do systemu eVotingPP.</h1><br>
                    Zeskanuj poniższy kod w aplikacji Google Authenticator, aby generować kody logowania do systemu.
                </p>
                <img src="cid:{image_cid}">
            </body>
        </html>
        """.format(image_cid=image_cid[1:-1]), subtype='html')

        with open(qr_name, 'rb') as img:
            maintype, subtype = mimetypes.guess_type(img.name)[0].split('/')
            msg.get_payload()[1].add_related(img.read(), 
                                                maintype=maintype, 
                                                subtype=subtype, 
                                                cid=image_cid)
        os.remove(qr_name)

        context = ssl.create_default_context()

        with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
            server.login(self.adres, self.haslo)
            server.sendmail(self.adres, odbiorca, msg.as_string())

    def SendAdminWelcomeEmail(self, odbiorca, qr_name):
            msg = EmailMessage()
            msg['Subject'] = 'Witaj w systemie eVotingPP'
            msg['From'] = 'eVotingPP <' + self.adres + '>'
            msg['To'] = odbiorca + ' <' + odbiorca + '>'
            msg.set_content('Zostałeś dodany jako admin do systemu eVotingPP. Zeskanuj poniższy kod QR w aplikacji Google Authenticator, aby generować kody logowania do systemu.')
            image_cid = make_msgid(domain='evotingpp.pl')
            msg.add_alternative("""\
            <html>
                <body>
                    <p>
                        <h1>Zostałeś dodany jako admin do systemu eVotingPP.</h1><br>
                        Zeskanuj poniższy kod w aplikacji Google Authenticator, aby generować kody logowania do systemu.
                    </p>
                    <img src="cid:{image_cid}">
                </body>
            </html>
            """.format(image_cid=image_cid[1:-1]), subtype='html')

            with open(qr_name, 'rb') as img:
                maintype, subtype = mimetypes.guess_type(img.name)[0].split('/')
                msg.get_payload()[1].add_related(img.read(), 
                                                    maintype=maintype, 
                                                    subtype=subtype, 
                                                    cid=image_cid)
            os.remove(qr_name)

            context = ssl.create_default_context()

            with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
                server.login(self.adres, self.haslo)
                server.sendmail(self.adres, odbiorca, msg.as_string())

    def SendVotingEmail(self, odbiorca, imie_nazwisko, voting_link):
        msg = EmailMessage()
        msg['Subject'] = 'Nowe głosowanie w systemie eVotingPP'
        msg['From'] = 'eVotingPP <' + self.adres + '>'
        msg['To'] = imie_nazwisko + ' <' + odbiorca + '>'
        msg.set_content('Masz dostęp do nowego głosowania w systemie eVotingPP. Kliknij w poniższy link aby zagłosować.')
        msg.add_alternative("""\
        <html>
            <body>
                <p>
                    <h1>Masz dostęp do nowego głosowania w systemie eVotingPP.</h1><br>
                    Kliknij w poniższy link aby zagłosować.<br>
                    <a href="{link}">Zagłosuj</a>
                </p>
            </body>
        </html>
        """.format(link=voting_link), subtype='html')

        context = ssl.create_default_context()

        with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
            server.login(self.adres, self.haslo)
            server.sendmail(self.adres, odbiorca, msg.as_string())