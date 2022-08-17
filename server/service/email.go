package service

import (
	"os"
	"strconv"

	"gopkg.in/gomail.v2"
)

func SendEmail(to []string, subject string, message string) error {
	HOST := os.Getenv("SMTP_HOST")
	SENDER := os.Getenv("SMTP_SENDER_NAME")
	PORT := os.Getenv("SMTP_PORT")
	EMAIL := os.Getenv("SMTP_AUTH_EMAIL")
	PASSWORD := os.Getenv("SMTP_AUTH_PASSWORD")
	PORTINT, err := strconv.Atoi(PORT)

	if err != nil {
		return err
	}

	mailer := gomail.NewMessage()
	mailer.SetHeader("From", SENDER)
	mailer.SetHeader("To", to[0])
	mailer.SetAddressHeader("Cc", "abdullahtegar8@gmail.com", "Tegar Abdullah")
	mailer.SetHeader("Subject", subject)
	mailer.SetBody("text/html", "<i>" +message + "</i>")


	dialer := gomail.NewDialer(
			HOST,
			PORTINT,
			EMAIL,
			PASSWORD,
	)

	err = dialer.DialAndSend(mailer)

	if err != nil {
		return err
	}

	return nil
}