import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import SmsIcon from "@material-ui/icons/Sms";
import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";
import SendSmsDialog from "./SendSmsDialog";
import sharedStylesFn from "../style/sharedStyles";

const useStyles = makeStyles(theme => ({
  ...sharedStylesFn(theme),
  buttons: {
    marginRight: 20
  }
}));

const SendResourcesButton = () => {
  const [showSmsDialog, setShowSmsDialog] = useState(false);

  const { t: str } = useTranslation();
  const classes = useStyles();
  const subjectString = str(
    "webapp:zoneFinder.email.subject",
    "Covid Resources NYC"
  );

  const resourceLinks = [str("webapp:zoneFinder.email.resourceUrl")];

  let bodyString = str("webapp:zoneFinder.email.body");
  resourceLinks.forEach(resourceLink => {
    bodyString += `${resourceLink}\n\n`;
  });

  const smsBodyString = `${subjectString}\n\n${bodyString}`;

  return (
    <>
      <Typography className={classes.text} variant="body1">
        {str(
          "webapp:zoneFinder.sendResources.message",
          "You can use the link below to send more resources if needed!"
        )}
      </Typography>
      <a
        target="_blank"
        className={classes.link}
        rel="noopener noreferrer"
        href={`mailto:?subject=${encodeURIComponent(
          subjectString
        )}&body=${encodeURIComponent(bodyString)}`}
      >
        <Button
          className={classes.buttons}
          variant="contained"
          endIcon={<MailOutlineIcon />}
        >
          {str("webapp:zoneFinder.sendResources.emailButtonText")}
        </Button>
      </a>
      <Button
        className={classes.buttons}
        onClick={() => setShowSmsDialog(true)}
        variant="contained"
        endIcon={<SmsIcon />}
      >
        {str("webapp:zoneFinder.sendResources.smsButtonText")}
      </Button>
      <SendSmsDialog
        isOpen={showSmsDialog}
        onClose={() => setShowSmsDialog(false)}
        message={smsBodyString}
      />
    </>
  );
};

export default SendResourcesButton;
