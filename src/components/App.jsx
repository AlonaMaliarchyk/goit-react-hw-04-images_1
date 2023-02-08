import { useState, useEffect, useCallback } from "react";
import ImageGallery from "./ImageGallery/ImageGallery";
import Searchbar from "./Searchbar";
import Loader from "./Loader";
import LoadBtn from "./Button";
import Modal from "./Modal";
import { searchPhoto }  from "./shared/services/posts-api.js";
import css from "./App.module.css";

const App = () => {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isMoreBtnVisible, setIsMoreBtnVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imgDetails, setImgDetails] = useState("");


  useEffect(() => {
    if (!search) {
      return
    } 
      const fethImg = async () => {
        try {
            setLoading( true );
          const data = await searchPhoto(search, page);
            if (data.totalHits > 0) {
              setImages(prevState => {
                return ([...prevState, ...data.hits]);
              });
              setIsMoreBtnVisible(page < Math.ceil(data.totalHits / 12));
              setIsModalVisible(false);
            }
        }
        catch (error) {
          setError(error.message);
        }
        finally {
          setLoading(false);
        }
      }
      fethImg();
},[search, page ])
    
  const handlerSearch = (value) => {
    setSearch(value);
    setImages([]);
      setPage(1);
  }

  const showModal = useCallback(largeImageURL => {
    setImgDetails(largeImageURL);
    setIsModalVisible(true);
  },[])
    
  const loadMore = () => {
    setPage(prevPage => prevPage + 1 )
  }
    
  const closeModal = () => {
      setIsModalVisible(false);
      setImgDetails("");
  }
    
    return (
        <>
        <Searchbar onSubmit={handlerSearch} />
        <ImageGallery images={images} showModal={ showModal} />
        {error && <p className={css.error}>Something went wrong. Please, try again later!</p>}
        {loading && <Loader />}
        {isMoreBtnVisible && <LoadBtn loadMoreHendler={loadMore} />}
        {isModalVisible && <Modal largeImageURL={imgDetails} close={closeModal} />}
        </>
  );
}
export default App;

