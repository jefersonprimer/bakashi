.glossaryContainer {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.title {
  font-size: 2rem;
  font-weight: bold;
}

.filters {
  display: flex;
  gap: 10px;
  position: relative;
}

.filterOptions {
  position: absolute;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  padding: 10px;
  top: 100%;
  right: 0;
  display: flex;
  flex-direction: column;
}

.filterOptions button {
  margin: 5px 0;
}

.letterFilter {
  display: flex;
  gap: 5px;
  margin-bottom: 20px;
}

.carousel {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.anime_card {
  width: 250px;
  background-color: #f8f8f8;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.anime_content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.anime_image {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.anime_details {
  margin-top: 10px;
  text-align: center;
}

.anime_name {
  font-size: 1.2rem;
  font-weight: bold;
}

.anime_synopsis {
  font-size: 0.9rem;
  color: #555;
}

.anime_audio {
  font-size: 0.8rem;
  color: #777;
}
