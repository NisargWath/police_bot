from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
from langchain_core.messages import HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI
from werkzeug.utils import secure_filename
import os
import smtplib
import ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import certifi

context = ssl.create_default_context(cafile=certifi.where())

app = Flask(__name__)


# Create the 'uploaded_photos' folder if it doesn't exist
UPLOAD_FOLDER = 'uploaded_photos'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


GOOGLE_API_KEY = "put your api"
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel(model_name="gemini-pro")
llm = ChatGoogleGenerativeAI(model="gemini-pro-vision",google_api_key=GOOGLE_API_KEY)
import markdown

def to_markdown(text):
    # Convert plain text to Markdown format
    md = markdown.markdown(text)
    return md


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send_message', methods=['POST'])
def send_message():
    msg = request.form['message'] + " Give me in 150-200 words realted the Maharashtra State Police  "
    print(msg)
    response = model.generate_content(msg) 
    return jsonify({"message": to_markdown(response.text)})





# Function to send email
def send_email(receiver_email, subject, body):
    sender_email = "nisargwath7@gmail.com"  # Your email
    password = "Nisargwath@211"  # Your email password

 # Create message container
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = subject


    # Attach body to the email
    msg.attach(MIMEText(body, 'plain'))
    

    try:
        # Create a secure SSL context
        context = ssl.create_default_context(ssl.Purpose.SERVER_AUTH)
        context.check_hostname = False

        # Connect to the SMTP server
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
            server.login(sender_email, password)
            server.sendmail(sender_email, receiver_email, msg.as_string())
            print("Email sent successfully!")
    except Exception as e:
        print(f"Error sending email: {str(e)}")


@app.route('/send_photo', methods=['POST'])
def send_photo():
    if 'photo' not in request.files:
        return jsonify({"error": "No file part"})
    
    photo = request.files['photo']
    if photo.filename == '':
        return jsonify({"error": "No selected file"})

    # Save the uploaded photo
    filename = secure_filename(photo.filename)
    photo.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    # Process the photo with langchain_google_genai
    image_url = f"/Users/appleApple/Documents/paloti/tri/uploaded_photos/{filename}"  # Local server URL
    message = HumanMessage(
        content=[
            {
                "type": "text",
                "text": "Write a short description about the image so we can give this information to the police",
            },
            {"type": "image_url", "image_url": image_url},
        ]
    )
  
    result = llm.invoke([message])
    report_content = result.content if result else "No report generated."

    # Send email to nearby police station
    receiver_email = "2117025@gpnagpur.ac.in"  # Change to the email of the nearby police station
    subject = "AI Generated Report from Image Description"
    body = f"This AI generated report is being submitted to the nearby police station.\n\nReport Content:\n{report_content}"
    
    send_email(receiver_email, subject, body)

    return jsonify({"message": f"This AI generated report is being submitted to the nearby police station:\n{report_content}"})




if __name__ == '__main__':
    app.run(debug=True)
