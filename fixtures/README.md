# Fixtures

This directory contains sample media files for testing and demo purposes.

## Contents

### Video Files
- `sample.mp4` - Sample video for live streaming tests
- `sample-short.mp4` - Short video for feed upload tests

### Audio Files
- `sample-voice.webm` - Sample voice clip
- `sample-voice.mp3` - Sample voice clip (MP3 format)

### Image Files
- `sample-image.jpg` - Sample image for message attachments
- `sample-banner.jpg` - Sample banner image
- `sample-avatar.png` - Sample avatar image

## Usage

### For Live Streaming Tests

```bash
docker exec -it gjyl-ffmpeg ffmpeg -re -i /fixtures/sample.mp4 \
  -c:v libx264 -preset veryfast -b:v 3000k \
  -c:a aac -b:a 128k \
  -f flv rtmp://nginx-rtmp:1935/live/test-stream-key
```

### For Feed Upload Tests

Use the upload flow in the app and select `sample-short.mp4`

### For Message Attachment Tests

Use the attach button in chat and select files from this directory

## Creating Your Own Fixtures

To create test fixtures:

### Generate test video:
```bash
ffmpeg -f lavfi -i testsrc=duration=10:size=1920x1080:rate=30 \
  -f lavfi -i sine=frequency=1000:duration=10 \
  -pix_fmt yuv420p -c:v libx264 -c:a aac \
  fixtures/sample.mp4
```

### Generate test audio:
```bash
ffmpeg -f lavfi -i sine=frequency=1000:duration=5 \
  -c:a libopus fixtures/sample-voice.webm
```

### Generate test image:
```bash
ffmpeg -f lavfi -i testsrc=size=1920x1080:rate=1:duration=1 \
  -frames:v 1 fixtures/sample-image.jpg
```

## Notes

- Keep fixture files small (< 10MB) for quick tests
- Don't commit large binary files to git
- Use `.gitignore` to exclude large fixtures
- For production testing, use actual media files
