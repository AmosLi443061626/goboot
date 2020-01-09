package log

import (
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"goboot/app/tools"
	"gopkg.in/natefinch/lumberjack.v2"
	"os"
)

var logger *zap.Logger

func NewLog() {
	hook := lumberjack.Logger{
		Filename: "./goboot.log",
		MaxSize:  1024,
		MaxAge:   8,
	}
	encoderConfig := zapcore.EncoderConfig{
		TimeKey:        "time",
		LevelKey:       "level",
		MessageKey:     "message",
		LineEnding:     zapcore.DefaultLineEnding,
		EncodeLevel:    zapcore.LowercaseLevelEncoder, // 小写编码器
		EncodeTime:     zapcore.ISO8601TimeEncoder,
		EncodeDuration: zapcore.SecondsDurationEncoder,
		EncodeCaller:   zapcore.FullCallerEncoder,
		EncodeName:     zapcore.FullNameEncoder,
	}
	atomicLevel := zap.NewAtomicLevel()
	atomicLevel.SetLevel(zap.InfoLevel)
	multiWrite := zapcore.NewMultiWriteSyncer(zapcore.AddSync(&hook))
	if tools.CONFIG.General.ENV == "Debug" {
		multiWrite = zapcore.NewMultiWriteSyncer(zapcore.AddSync(os.Stdout), zapcore.AddSync(&hook))
	}
	core := zapcore.NewCore(
		zapcore.NewJSONEncoder(encoderConfig),
		multiWrite,
		atomicLevel,
	)
	logger = zap.New(core)
}

func Info(s string) {
	logger.Info(s)
}

func Debug(s string) {
	logger.Debug(s)
}

func Error(s string) {
	logger.Error(s)
}
