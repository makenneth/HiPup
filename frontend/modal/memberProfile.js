module.exports = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)'
  },
  content: {
    position: 'relative',
    margin: "0 auto",
    top:  "40%",
    transform: "translateY(40%)",
    width: '500px',
    height: '350px',
    border: '1px solid #ccc',
    opacity: '0.9',
    background: '#000',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '10px',
    padding: '40px'
  }
};