package tools

import "net/mail"

func ValidEmail(email string) bool {
	_, err := mail.ParseAddress(email)
	return err == nil
}