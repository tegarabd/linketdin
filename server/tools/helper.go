package tools

import (
	"fmt"
	"math/rand"
	"strings"
	"time"
)

func GenerateCode() string {
	rand.Seed(time.Now().UnixNano())
	var code strings.Builder
	var n int
	var s string

	for i := 0; i < 6; i++ {
		n = rand.Intn(10)
		s = fmt.Sprintf("%d", n)
		code.WriteString(s)
	}
	
	return code.String()
}