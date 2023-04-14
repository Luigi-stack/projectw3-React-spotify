import { Button, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
const Artist = () => {
  const [artist, setArtist] = useState([]);
  const [tracks, setTracks] = useState([]);

  const param = useParams();

  function albumCard(songInfo) {
    return `
          <div class="col-sm-auto col-md-auto text-center mb-5">
            <a href="/album_page.html?id=${songInfo.album.id}">
              <img class="img-fluid" src=${
                songInfo.album.cover_medium
              } alt="1" />
            </a>
            <p>
              <a href="#">
                Track: "${
                  songInfo.title
                }"
              </a><br>
              <a href="/album_page.html?id=${songInfo.album.id}">
                Album: "${
                  songInfo.album.title
                }"
              </a>
            </p>
          </div>`;
  }

  const handleArtist = async () => {
    let artistId = param.id;

    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/deezer/artist/" + artistId,
      );

      if (response.ok) {
        let artist = await response.json();
        console.log(artist);
        setArtist(artist);
        let tracksResponse = await fetch(
          "https://striveschool-api.herokuapp.com/api/deezer/search?q=" +
            artist.name,
        );
        if (tracksResponse.ok) {
          let tracklist = await tracksResponse.json();
          setTracks(tracklist.data);
          console.log(tracklist);
        }
      }
    }
      catch (exception) {
    }
  };
  useEffect(() => {
    handleArtist();
  }, []);
  return (
    <>
      <Col className="col-12 col-md-9 offset-md-3 mainPage">
        <Row className="row mb-3 m-0">
          <Col className="col-9 col-lg-11 mainLinks d-none d-md-flex">
            <a href="#a">TRENDING</a>
            <a href="#a">PODCAST</a>
            <a href="#a">MOODS AND GENRES</a>
            <a href="#a">NEW RELEASES</a>
            <a href="#a">DISCOVER</a>
          </Col>
        </Row>

        <Row className="row m-0">
          <Col className="col-12 col-md-10 col-lg-10 mt-5">
            <h2 className="titleMain">{artist && artist.name} </h2>
            <div id="followers">{artist && artist.nb_fan}</div>
            <div
              className="d-flex justify-content-center"
              id="button-container"
            >
              {artist && (
                <>
                  <Button
                    className="btn btn-success me-5 "
                    id="playButton"
                  >
                    PLAY
                  </Button>
                  <Button
                    className="btn  "
                    id="followButton"
                  >
                    FOLLOW
                  </Button>
                </>
              )}
            </div>
          </Col>
        </Row>
        <Row className="row mb-3 m-0">
          <Col className="col-10 offset-1 col-md-10 col-lg-10 p-0">
            <div className="mt-4 d-flex justify-content-start">
              <h2 className="text-white font-weight-bold">Tracks</h2>
            </div>
            <div className="pt-5 mb-5">
              <Row className="row" id="apiLoaded">
                {tracks?.map((songInfo) => (
                  <div class="col-sm-auto col-md-auto text-center mb-5">
                    <a href={`/album/${songInfo.album.id}`}>
                      <img
                        class="img-fluid"
                        src={
                          songInfo.album.cover_medium
                        }
                        alt="cover"
                      />
                    </a>
                    <p>
                      <a href="#yh">
                        {
                          songInfo.title.length < 16
                        }
                      </a>
                      <br></br>
                      <a href={`/album/${songInfo.album.id}`}>
                        {
                          songInfo.album.title.length < 16
                          }
                      </a>
                    </p>
                  </div>
                ))}
              </Row>
            </div>
          </Col>
        </Row>
      </Col>
    </>
  );
};
export default Artist;
