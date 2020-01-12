package token

import (
	"encoding/base64"
	"github.com/dgrijalva/jwt-go"
	"goboot/app/tools"
	"time"
)

//TODO:token生成

type UserCredentials struct {
	UserId   int    `json:"userid"`
	Username string `json:"username"`
}

func (u *UserCredentials) JWT() string {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := make(jwt.MapClaims)
	claims["exp"] = time.Now().Add(240 * time.Hour).Unix()
	str, err := tools.JSON.MarshalToString(u)
	if err != nil {
		return ""
	}
	claims["user"] = str
	token.Claims = claims
	tokenString, _ := token.SignedString([]byte(tools.CONFIG.General.JwtToken))
	return base64.StdEncoding.EncodeToString([]byte(tokenString))
}

func (u *UserCredentials) JWTNewDecoder(code string) error {
	tokenString, err := base64.StdEncoding.DecodeString(code)
	if err != nil {
		return err
	}
	parseAuth, err := jwt.Parse(string(tokenString), func(*jwt.Token) (interface{}, error) {
		return []byte(tools.CONFIG.General.JwtToken), nil
	})
	if err != nil {
		return err
	}
	claim := parseAuth.Claims.(jwt.MapClaims)
	s := claim["user"].(string)
	return tools.JSON.Unmarshal([]byte(s), u)
}
