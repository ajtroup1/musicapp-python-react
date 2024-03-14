from config import db

class Song(db.Model):
    #fields: id(auto pk), songName, artist, album, rating, imgURL, runtime, asoa (bool)
    id = db.Column(db.Integer, primary_key=True)
    songName = db.Column(db.String(255), unique=False, nullable=False)
    artist = db.Column(db.String(255), unique=False, nullable=False)
    album = db.Column(db.String(255), unique=False, nullable=False)
    rating = db.Column(db.Integer, unique=False, nullable=True)
    imgURL = db.Column(db.String(255), unique=False, default="#") #.image is over album / single cover. unique is false since multiple songs belong to one album
    runtime = db.Column(db.String(10), unique=False, nullable=False, default='n/a') #runtime is split by ':' so string is easier than int or float
    asoa = db.Column(db.Boolean(), default=False) #adam seal of approval

    def to_json(self):
        return {
            "id": self.id,
            "songName": self.songName,
            "artist": self.artist,
            "album": self.album,
            "rating": self.rating,
            "imgURL": self.imgURL,
            "runtime": self.runtime,
            "asoa": self.asoa
        }

