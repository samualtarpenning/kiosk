import moment from "moment";

const checkCacheAndReload = (): void => {
  const LAST_RELOAD_KEY: string = 'last_reload_time'; 
  const RELOAD_INTERVAL: number = 48 * 60 * 60 * 1000;

  const lastReloadTime: string | null = localStorage.getItem(LAST_RELOAD_KEY);
  const currentTime: number = moment().valueOf();
  if (!lastReloadTime || currentTime - parseInt(lastReloadTime) > RELOAD_INTERVAL) {
    window.localStorage.clear(); // Clears localStorage
    localStorage.setItem(LAST_RELOAD_KEY, currentTime.toString());
    window.location.reload();
  }
};

export default checkCacheAndReload;
