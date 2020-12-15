export const calculateTimeLeft = (time_off) => {
    let now = new Date().getTime();
    let difference = time_off - now
    let timeLeft = {}

    if (difference > 0) {
        timeLeft = {
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
      };
    }else{
      return false;
    }
    return timeLeft;
}