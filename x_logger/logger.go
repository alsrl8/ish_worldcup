package x_logger

import (
	"log"
	"os"
	"sync"
)

type XLogger struct {
	*log.Logger
}

var instance *XLogger
var errInstance *XLogger
var Once sync.Once

func NewLogger() *XLogger {
	Once.Do(func() {
		logPath := "./app.log"
		logFile, err := os.OpenFile(logPath, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0666)
		if err != nil {
			log.Fatalf("Failed to open log file: %v", err)
		}
		instance = &XLogger{
			Logger: log.New(logFile, "XLogger: ", log.Ldate|log.Ltime|log.Lshortfile),
		}
	})
	return instance
}

func NewErrorLogger() *XLogger {
	Once.Do(func() {
		logPath := "D:\\03_Side_Projects\\ish_worldcup\\logs\\error.log"
		logFile, err := os.OpenFile(logPath, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0666)
		if err != nil {
			log.Fatalf("Failed to open log file: %v", err)
		}
		errInstance = &XLogger{
			Logger: log.New(logFile, "XLogger: ", log.Ldate|log.Ltime|log.Lshortfile),
		}
	})
	return errInstance
}
