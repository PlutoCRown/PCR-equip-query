from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
  with open("build/index.html") as file:
    data = file.read()
  return data

@app.route('/static/css/main.a6d743bc.css')
def l1():
  with open("build/static/css/main.a6d743bc.css") as file:
    data = file.read()
  return data

@app.route('/static/js/main.2a89ecd0.js')
def l2():
  with open("build/static/js/main.2a89ecd0.js") as file:
    data = file.read()
  return data

@app.route('/manifest.json')
def l3():
  with open("build/static/manifest.json") as file:
    data = file.read()
  return data

@app.route('/static/css/main.a6d743bc.css')
def l4():
  with open("build/static/css/main.a6d743bc.css") as file:
    data = file.read()
  return data


if __name__ == '__main__':
  print("运行！")
  app.run()