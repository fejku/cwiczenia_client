import React from "react";
import { MobileDatePicker, LocalizationProvider } from "@material-ui/pickers";
import MomentUtils from "@material-ui/pickers/adapter/moment";
import { TextField } from "@material-ui/core";

interface Props {
  data: Date;
  setData: React.Dispatch<React.SetStateAction<Date>>;
}

const MyDatePicker: React.FC<any> = ({ data, setData, className, ...otherProps }) => {
  const handleDataChange = (date: Date | null) => {
    if (date) {
      setData(date);
    }
  };

  return (
    <LocalizationProvider dateAdapter={MomentUtils}>
      <MobileDatePicker
        renderInput={(props) => <TextField className={className} {...props} />}
        value={data}
        onChange={handleDataChange}
        inputFormat="YYYY-MM-DD"
        {...otherProps}
      />
    </LocalizationProvider>
  );
};

export default MyDatePicker;
