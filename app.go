package main

import (
	"changeme/images"
	"changeme/tournament"
	"changeme/x_logger"
	"context"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) AddImage(name string, data string) (string, error) {
	errLogger := x_logger.NewErrorLogger()

	res, err := images.AddImage(name, data)
	if err != nil {
		errLogger.Println("error: ", err)
		return "", err
	}
	return res, nil
}

func (a *App) GetImageNum() (int, error) {
	errLogger := x_logger.NewErrorLogger()

	num, err := images.GetImageNum()
	if err != nil {
		errLogger.Println("error: ", err)
		return 0, err
	}
	return num, nil
}

func (a *App) GetImageList(page int, perPage int) ([]*images.Image, error) {
	errLogger := x_logger.NewErrorLogger()

	imgs, err := images.GetImageList(page, perPage)
	if err != nil {
		errLogger.Println("error: ", err)
		return nil, err
	}
	return imgs, nil
}

func (a *App) DeleteImage(id string) error {
	errLogger := x_logger.NewErrorLogger()

	err := images.DeleteImage(id)
	if err != nil {
		errLogger.Println("error: ", err)
		return err
	}
	return nil
}

func (a *App) StartTournament() error {
	return tournament.StartTournament()
}

func (a *App) GetTotalRound() (int, error) {
	return tournament.GetTotalRound()
}

func (a *App) GetCurrentRound() (int, error) {
	return tournament.GetCurrentRound()
}

func (a *App) GetCandidates() ([]images.Image, error) {
	return tournament.GetCandidates()
}

func (a *App) GoToNextRound() (bool, error) {
	return tournament.GoToNextRound()
}

func (a *App) SelectWinner(winnerId string, loserId string) error {
	return tournament.SelectWinner(winnerId, loserId)
}

func (a *App) GetFinalWinner() (*images.Image, error) {
	return tournament.GetFinalWinner()
}
