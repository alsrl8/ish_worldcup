package tournament

import (
	"changeme/images"
	"errors"
)

type Setting struct {
	TotalRound    int              `json:"totalRound"`
	CurrentRound  int              `json:"currentRound"`
	CurrentImages *[]*images.Image `json:"currentImages"`
	NextImages    *[]*images.Image `json:"nextImages"`
	Winner        *images.Image    `json:"winner"`
}

var setting *Setting

func StartTournament() error {
	if images.Images == nil {
		return errors.New("images is nil")
	} else if len(*images.Images) < 2 {
		return errors.New("images is less than 2")
	}

	setting = &Setting{
		TotalRound:    (len(*images.Images) + 1) / 2,
		CurrentRound:  1,
		CurrentImages: images.Images,
		NextImages:    nil,
	}
	return nil
}
