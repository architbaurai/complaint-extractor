# Complaint Extractor

**Complaint Extractor** is an automated system for collecting, analyzing, and storing citizen complaints from social media and direct submissions. It uses Node.js, MongoDB, Gemini LLM, Cloudinary, and the Twitter API to convert unstructured complaints into actionable, structured data.

## Overview

- Collects complaints tagged to an official municipal Twitter handle.
- Uses a large language model (Gemini) to extract structured details: city, street, type, severity.
- Supports file uploads and stores media securely on Cloudinary.
- Periodic background jobs fetch new tweets automatically.
- All data is stored in MongoDB for further processing and visualization.
