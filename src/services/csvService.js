import { jsonToCSV } from "react-native-csv";
import RNFS from "react-native-fs";

export const saveCsv = async (dataLogs) => {
  const csv = jsonToCSV(dataLogs);
  const path = RNFS.DownloadDirectoryPath + "/obd_logs.csv";
  await RNFS.writeFile(path, csv, "utf8");
  return path;
};