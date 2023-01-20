export const videoTime = (input: string) => {
  // 영상길이
  let reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
  let hours = "",
    minutes = "",
    seconds = "";
  if (reptms.test(input)) {
    let matches: any = reptms.exec(input);
    if (matches[1]) hours = matches[1];
    if (matches[2]) minutes = matches[2];
    if (matches[3]) seconds = matches[3];
  }
  
  if (minutes.length === 1) minutes = `0${minutes}`;
  if (seconds.length === 1) seconds = `0${seconds}`;

  if (hours.length === 0) {
    if (minutes.length === 0) {
      if (seconds.length === 0) {
        return `00:00`;
      } else {
        return `00:${seconds}`;
      }
    } else {
      if(seconds.length === 0){
        return `${minutes}:00`;
      } else {
        return `${minutes}:${seconds}`;
      }
    }
  } else {
    if (minutes.length === 0) {
      if (seconds.length === 0) {
        return `${hours}:00:00`;
      } else return `${hours}:00:${seconds}`;
    } else {
      if(seconds.length === 0){
        return `${hours}:${minutes}:00`;
      } else {
        return `${hours}:${minutes}:${seconds}`;
      }
    }
  }
};
