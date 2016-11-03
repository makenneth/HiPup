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
	  position: 'absolute',
	  margin: "0 auto",
	  top: "40%",
	  transform: "translateY(-40%)",
	  width: '300px',
	  height: '100px',
	  border: '1px double white',
	  opacity: '0.8',
	  background: '#000',
	  overflow: 'auto',
	  WebkitOverflowScrolling: 'touch',
	  borderRadius: '10px',
	  padding: '40px'
	}
};