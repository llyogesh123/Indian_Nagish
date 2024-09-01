from flask import Flask, request, jsonify
from twilio.rest import Client
from flask_cors import CORS
import random

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

# account_sid = 'AC34e2b9aea6ce796e1c5a528b960604b2'
# auth_token = '9792302e3e1c0d084f1a56019d24c8ed'
# client = Client(account_sid, auth_token)

# message = client.messages.create(
#     body="Hello from Twilio!",
#     from_='+918056735058',  # Your Twilio number
#     to='+918056735058'      # The recipient's phone number
# )

# print(message.sid)


# Twilio credentials (replace with your actual credentials)
TWILIO_ACCOUNT_SID = 'AC34e2b9aea6ce796e1c5a528b960604b2'
TWILIO_AUTH_TOKEN = '9792302e3e1c0d084f1a56019d24c8ed'
TWILIO_PHONE_NUMBER = '+918056735058'

client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

@app.route('/send-otp', methods=['POST'])
def send_otp():
    data = request.get_json()

    if not data or 'phoneNumber' not in data:
        return jsonify({'error': 'Phone number is required'}), 400

    phone_number = data['phoneNumber']

    # Generate a 6-digit OTP
    otp = str(random.randint(100000, 999999))

    try:
        # Send OTP via SMS using Twilio
        message = client.messages.create(
            body=f'Your OTP is: {otp}',
            from_=TWILIO_PHONE_NUMBER,
            to=phone_number
        )
        
        return jsonify({'message': 'OTP sent successfully', 'otp': otp}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
