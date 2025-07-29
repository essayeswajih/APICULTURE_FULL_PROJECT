import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

AdminEmail = os.getenv('SENDER_EMAIL')

def send_email_via_gmail(to_email, subject, body):


# Access environment variables
    sender_email = os.getenv('SENDER_EMAIL')
    sender_password = os.getenv('SENDER_PASSWORD')

    # Setup the MIME
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = to_email
    msg['Subject'] = subject

    # Add body to email
    msg.attach(MIMEText(body, 'plain'))

    # Setup the server
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()  # Secure the connection

    # Login to the server
    server.login(sender_email, sender_password)

    # Send the email
    text = msg.as_string()
    server.sendmail(sender_email, to_email, text)
    server.quit()

