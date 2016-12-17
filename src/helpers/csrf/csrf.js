const getCSRF = () => {
  const els = document.getElementsByTagName("meta");
  for (let i = 0; i < els.length; i++) {
    if (els[i].getAttribute("name") === "csrf-token") {
      return els[i].getAttribute("content");
    }
  }

  return null;
};

export default () => {
  return {
    "X-CSRF-Token": getCSRF()
  };
}

