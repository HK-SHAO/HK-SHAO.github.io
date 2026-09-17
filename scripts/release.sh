#!/bin/sh
set -eu

if [ "$(git branch --show-current)" != "main" ]; then
  echo "请在 main 上发布" >&2
  exit 1
fi

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "工作区不干净" >&2
  exit 1
fi

git fetch github
tree=$(git rev-parse "main^{tree}")
parent=$(git rev-parse github/main)

if [ "$tree" = "$(git rev-parse "${parent}^{tree}")" ]; then
  echo "github/main 已是当前内容"
  exit 0
fi

commit=$(git commit-tree "$tree" -p "$parent" -m "发布站点当前内容")
git update-ref refs/heads/github "$commit"
git push github github:main
git branch --set-upstream-to=github/main github >/dev/null
echo "已发布 $commit"
