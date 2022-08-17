package main

import (
	"log"
	"net/http"
	"os"
	"server/database"
	"server/directives"
	"server/graph"
	"server/graph/generated"
	"server/middleware"
	"server/service"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/gorilla/mux"
	"github.com/gorilla/sessions"
	"github.com/joho/godotenv"
	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
	"github.com/markbates/goth/providers/google"
)

func initGoogleAuth() {
	key := "secret"  
  maxAge := 86400 * 2
  isProd := false       

  store := sessions.NewCookieStore([]byte(key))
  store.MaxAge(maxAge)
  store.Options.Path = "/"
  store.Options.HttpOnly = true   
  store.Options.Secure = isProd

  gothic.Store = store

  goth.UseProviders(
    google.New("385676713987-ui20jl87gkk8u64sqma4idlp5j7osda3.apps.googleusercontent.com", "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", "http://127.0.0.1:8080/auth/google/callback", "email", "profile"),
  )

}

func initRoute() (*mux.Router) {
	router := mux.NewRouter()
	router.Use(middleware.AuthMiddleware)

	c := generated.Config{Resolvers: &graph.Resolver{}}
	c.Directives.Auth = directives.Auth

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(c))

	router.Handle("/", playground.Handler("GraphQL playground", "/graph"))
	router.Handle("/graph", srv)
	router.HandleFunc("/auth/{provider}", service.BeginGoogleAuth)
	router.HandleFunc("/auth/{provider}/callback", service.ResolveGoogleAuth)

	return router
}

const defaultPort = "8080"

func main() {

	godotenv.Load()

	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	database.Connect()
	database.Migrate()

	initGoogleAuth()
	router := initRoute()

	log.Printf("connect to http://127.0.0.1:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, router))

	defer database.CloseDB()
}
