package images

import (
	"changeme/x_logger"
	base64encode "encoding/base64"
	"errors"
	"github.com/google/uuid"
)

func AddImage(name string, base64 string) (string, error) {
	logger := x_logger.NewLogger()
	logger.Println("add image: ", name, "")

	if name == "" || base64 == "" {
		return "", errors.New("invalid input")
	}

	const base64Prefix = "data:image/"
	idx := len(base64Prefix)
	if len(base64) < idx {
		return "", errors.New("invalid base64 data")
	}

	// Remove base64 metadata header
	dataIdx := len(base64)
	for i, c := range base64 {
		if c == ',' {
			dataIdx = i + 1
			break
		}
	}
	_, err := base64encode.StdEncoding.DecodeString(base64[dataIdx:])
	if err != nil {
		return "", err
	}

	if Images == nil {
		Images = &[]*Image{}
	}

	*Images = append(*Images, &Image{
		ID:   uuid.New().String(),
		Name: name,
		Data: base64,
	})
	return "파일을 성공적으로 읽었습니다.", nil
}

func GetImageNum() (int, error) {
	return len(*Images), nil
}

func GetImageList(page int, perPage int) ([]*Image, error) {
	if page <= 0 || perPage <= 0 {
		return nil, errors.New("invalid page or perPage")
	}

	start := (page - 1) * perPage
	end := start + perPage

	if start >= len(*Images) {
		return nil, nil
	}

	if end > len(*Images) {
		end = len(*Images)
	}

	var images []*Image
	for i := start; i < end; i++ {
		images = append(images, (*Images)[i])
	}

	return images, nil
}

func DeleteImage(id string) error {
	if id == "" {
		return errors.New("invalid id")
	}

	var modified []*Image
	for _, image := range *Images {
		if image.ID == id {
			continue
		}
		modified = append(modified, image)
	}
	Images = &modified

	return nil
}
