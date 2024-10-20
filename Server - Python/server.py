from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import requests
from bs4 import BeautifulSoup

load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'])
def get_data():
    search_query = request.json.get('search')
    page = request.json.get("page")
    data = []

    response = requests.get(f"https://www.aliexpress.com/w/wholesale-{search_query}.html?page={page}")

    if response.status_code != 200:
        print("Error:", response.status_code)
   
    webpage = response.content
    
    parsed_content = BeautifulSoup(webpage, "html.parser")

    cards = [card.prettify() for card in parsed_content.find_all("div", class_="list--gallery--C2f2tvm")]
    
    for card in cards:
        parsed_card = BeautifulSoup(card, "html.parser")

        image = parsed_card.find("img")
        src = image["src"] if image and "src" in image.attrs else None
        headline = "".join(parsed_card.find("h3").text.split("\n")).strip()
        price = "".join(parsed_card.find("div", class_="multi--price-sale--U-S0jtj").text.split()).strip()

        data.append({
            "image": src,
            "headline": headline,
            "price": price,
        })

        if len(data) >= 50:
            return jsonify(data)
        
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=3002)