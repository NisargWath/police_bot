from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
from langchain_core.messages import HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI
from werkzeug.utils import secure_filename
import os
app = Flask(__name__)


# Create the 'uploaded_photos' folder if it doesn't exist
UPLOAD_FOLDER = 'uploaded_photos'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


GOOGLE_API_KEY = "put you api"
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
    print(result.content)
    # result_dict = result[0].as_dict() if result else {}  # Convert to dictionary
    return jsonify({"message": f"This Ai generated report is being submite to near by police station  {result.content}"})
    




if __name__ == '__main__':
    app.run(debug=True)
