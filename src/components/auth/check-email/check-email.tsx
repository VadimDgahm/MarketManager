import { Link } from "react-router-dom";

import EmailImage from "@/components/auth/check-email/checkEmailImage/emailImage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";

import s from "./check-email.module.scss";

type EmailCheckingProps = {
  email: string;
};

export const CheckEmail = ({ email }: EmailCheckingProps) => {
  return (
    <Card className={s.cardWrapper}>
      <div className={s.contentWrapper}>
        <Typography className={s.title} variant={"large"}>
          Check Email
        </Typography>
        <EmailImage className={s.image} />
        <Typography className={s.inform} variant={"body2"}>
          We’ve sent an Email with instructions to <br /> {email}
        </Typography>
        <Button as={Link} className={s.backButton} fullWidth to={"/login"}>
          Back to Sign In
        </Button>
      </div>
    </Card>
  );
};
