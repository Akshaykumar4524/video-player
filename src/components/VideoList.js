
const VideoList = ({ handleUpdatevideo, queue, handleQueue }) => {

  return (
    <div className="overflow-y-auto h-[85vh]" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
      {
        queue?.map((media, index) => {
          return <VideoCard video={media} key={media?.title} handleClick={handleUpdatevideo} handleQueue={handleQueue} queue={queue} index={index} />
        })
      }
    </div>
  );
};

const VideoCard = ({ video, handleClick, queue, handleQueue, index }) => {

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('index', index.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropIndex) => {
    const dragIndex = parseInt(e.dataTransfer.getData('index'));
    if (dragIndex === dropIndex) return;
    const newVideos = [...queue];
    const [dragItem] = newVideos.splice(dragIndex, 1);
    newVideos.splice(dropIndex, 0, dragItem);
    handleQueue(newVideos)
  };

  return (
    <div
      onClick={() => handleClick(video)}
      className="p-4 border rounded-lg cursor-pointer hover:bg-gray-100 mb-2"
      draggable
      onDragStart={(e) => handleDragStart(e, index)}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, index)}
    >
      <img src={'https://storage.googleapis.com/gtv-videos-bucket/sample/' + video?.thumb} alt={video?.title} className="mb-2 object-cover w-full h-full rounded-lg" />
      <h2 className="text-lg font-semibold">{video?.title}</h2>
      <p className="text-gray-600">{video?.subtitle}</p>
    </div>
  )
}

export default VideoList;