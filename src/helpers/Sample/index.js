/*
 * Array participant (<Immutable.List> source, int size)
 */
export const immutableSample = (source, size) => {
  const sample = [];
  const participants = source;
  const sourceSize = source.size;
  if (!sourceSize) {
    return sample;
  }
  const used = {};


  for (let i = 0; i < size; i++) {
    let sampleIdx = Math.floor(Math.random() * sourceSize);
    while (used[sampleIdx]) {
      sampleIdx = Math.floor(Math.random() * sourceSize);
    }
    sample.push(participants.get(sampleIdx));
    used[sampleIdx] = true;

    if (sample.length >= sourceSize) {
      break;
    }
  }
  return sample;
}