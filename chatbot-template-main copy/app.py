from flask import Flask, render_template, request, jsonify
import google.generativeai as genai



app = Flask(__name__)
GOOGLE_API_KEY = "Put your API"
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel(model_name="gemini-pro")

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
    msg = request.form['message'] + " Give me in 150-200 words "
    print(msg)
    response = model.generate_content(msg) 
    return jsonify({"message": to_markdown(response.text)})

if __name__ == '__main__':
    app.run(debug=True)
