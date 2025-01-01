package tournament

import "errors"

func GetTotalRound() (int, error) {
	if setting == nil {
		return 0, errors.New("setting is nil")
	}
	return setting.TotalRound, nil
}

func GetCurrentRound() (int, error) {
	if setting == nil {
		return 0, errors.New("setting is nil")
	}
	return setting.CurrentRound, nil
}

func GoToNextRound() (bool, error) {
	if setting == nil {
		return false, errors.New("setting is nil")
	}
	setting.CurrentRound++
	if setting.CurrentRound > setting.TotalRound {
		if setting.NextImages == nil {
			return false, errors.New("nextImages is nil")
		} else if len(*setting.NextImages) == 0 {
			return false, errors.New("nextImages is empty")
		}

		if len(*setting.NextImages) == 1 {
			setting.Winner = (*setting.NextImages)[0]
			return true, nil
		}

		setting.CurrentRound = 1
		setting.TotalRound = (len(*setting.NextImages) + 1) / 2
		setting.CurrentImages = setting.NextImages
		setting.NextImages = nil
	}

	return false, nil
}
