#endpoints: create, read, update (using soft delete)
from flask import request, jsonify
from config import app, db
from models import Song

@app.route('/songs', methods=['GET'])
def get_songs():
    songs = Song.query.all()
    json_songs = [song.to_json() for song in songs]  # Convert map object to list
    return jsonify({'songs': json_songs})

@app.route('/addsong', methods=['POST'])
def create_song():
    songName = request.json.get('songName')
    artist = request.json.get('artist')
    album = request.json.get('album')
    rating = request.json.get('rating')
    imgURL = request.json.get('imgURL')
    runtime = request.json.get('runtime')
    asoa = request.json.get('asoa')

    if not songName or not artist or not album or not rating or not imgURL or not runtime or not asoa: #if one of the relevant fields is missing during object creation
        return jsonify({'message': 'You must include all fields when creating a song object'}), 400 #400 = bad request error
    
    newSong = Song(songName=songName, artist=artist, album=album, rating=rating, imgURL=imgURL, runtime=runtime, asoa=asoa)

    try:
        db.session.add(newSong)
        db.session.commit()
    except Exception as e:
        return jsonify({'message': str(e)}), 400
    
    return jsonify({'message': 'Song created'}), 201 #201 = successs response, says one or more resources was created

@app.route('/editsong/<int:id>', methods=['PATCH'])
def update_song(id):
    song = Song.query.get(id)

    if not song:
        return jsonify({'message': 'Song not found'}), 404 #error response, resource not found
    
    data = request.json
    song.songName = data.get('songName', song.songName)
    song.artist = data.get('artist', song.artist)
    song.album = data.get('album', song.album)
    song.rating = data.get('rating', song.rating)
    song.imgURL = data.get('imgURL', song.imgURL)
    song.runtime = data.get('runtime', song.runtime)
    song.asoa = data.get('asoa', song.asoa)

    db.session.commit()

    return jsonify({'message': 'Song updated'}), 200 #general success response

@app.route('/deletesong<int:id>', methods=['DELETE']) #more likely to update a deleted bool (soft delete) in real projects, but here is how to hard delete
def delete_song(id):
    song = Song.query.get(id)

    if not song:
        return jsonify({'message': 'Song not found'}), 404
    
    db.session.delete(song)
    db.session.commit()

    return jsonify({'message': 'Song deleted successfully'}), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    app.run(debug=True)


#localhost:3306/addsong
