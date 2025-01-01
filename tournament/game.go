package tournament

import (
	"changeme/images"
	"errors"
	"math/rand"
	"time"
)

func GetCandidates() ([]images.Image, error) {
	if setting.CurrentImages == nil {
		return nil, errors.New("images is nil")
	} else if len(*setting.CurrentImages) < 2 {
		return []images.Image{
			*(*((*setting).CurrentImages))[0],
		}, nil
	}

	rand.New(rand.NewSource(time.Now().UnixNano()))
	picked := rand.Perm(len(*setting.CurrentImages))[:2]
	return []images.Image{*(*setting.CurrentImages)[picked[0]], *(*setting.CurrentImages)[picked[1]]}, nil
}

func SelectWinner(winnerId string, loserId string) error {
	if *setting.CurrentImages == nil {
		return errors.New("images is nil")
	}

	if !isWinnerIdExist(winnerId) {
		return errors.New("winnerId is not exist")
	}

	if setting.NextImages == nil {
		setting.NextImages = &[]*images.Image{}
	}

	winnerImg, err := getWinnerImage(winnerId)
	if err != nil {
		return err
	}
	*setting.NextImages = append(*setting.NextImages, winnerImg)

	var modifiedImages []*images.Image
	for _, img := range *setting.CurrentImages {
		if img.ID == winnerId || img.ID == loserId {
			continue
		}
		modifiedImages = append(modifiedImages, img)
	}
	setting.CurrentImages = &modifiedImages

	return nil
}

func idExistInImages(id string) bool {
	for _, img := range *setting.CurrentImages {
		if img.ID == id {
			return true
		}
	}
	return false
}

func isWinnerIdExist(winnerId string) bool {
	return idExistInImages(winnerId)
}

func isLoserIdExist(loserId string) bool {
	return idExistInImages(loserId)
}

func getImage(id string) (*images.Image, error) {
	for _, img := range *setting.CurrentImages {
		if img.ID == id {
			return img, nil
		}
	}
	return nil, errors.New("id is not exist")
}

func getWinnerImage(winnerId string) (*images.Image, error) {
	return getImage(winnerId)
}

func GetFinalWinner() (*images.Image, error) {
	if setting.Winner == nil {
		return nil, errors.New("winner is nil")
	}

	return setting.Winner, nil
}
