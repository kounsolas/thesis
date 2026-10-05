# Notebooks

| Notebook | What it runs | |
|---|---|---|
| [vulnerability_repair_pipeline.ipynb](vulnerability_repair_pipeline.ipynb) | The full pipeline: Bearer scan, vulnerability check, self-reflection, test generation, candidate patches, entropy ranking, patch selection | [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/kounsolas/thesis/blob/main/notebooks/vulnerability_repair_pipeline.ipynb) |
| [vulnerability_repair_baseline.ipynb](vulnerability_repair_baseline.ipynb) | The single-shot baseline: Bearer scan, vulnerability check, one patch request | [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/kounsolas/thesis/blob/main/notebooks/vulnerability_repair_baseline.ipynb) |

## Requirements

- **Google Colab.** The notebooks import `google.colab`, write under `/content`, and download the Linux build of Bearer.
- **A GPU runtime with about 24 GB of GPU memory.** The thesis used an NVIDIA L4 with the high-RAM option; the quantised model needs about 22 GB of GPU memory.
- No Hugging Face token is needed.

Everything else is installed by the first cells: `transformers` 4.51.3, `torch` 2.6.0, `autoawq`, `accelerate`, and Bearer CLI 1.49.0. The model is [`stelterlab/NextCoder-32B-AWQ`](https://huggingface.co/stelterlab/NextCoder-32B-AWQ), loaded with `trust_remote_code=True`.

## Usage

1. Open the notebook in Colab and select the GPU runtime.
2. Go to the section *Store the vulnerable code in a file with the correct extension*. Paste the code to analyse into the variable `code` and set `language` to one of `javascript`, `typescript`, `python`, `java`, `go`, `ruby` or `php`.
3. Run all cells.
4. Check the section *Inspect the vulnerabilities found from Bearer*. When Bearer reports more than one finding, the notebook processes the first.

If the model judges the code safe, the notebook prints "Model finds the code safe." and waits at an input prompt. Stop the run there: typing `y` only releases the prompt, and the remaining cells would then run without a confirmed vulnerability.

The pipeline notebook ends by printing the chosen patch (the line range to replace and the replacement code) and the candidates it did not choose. The patch is not applied to the file.

## What the saved outputs show

Both notebooks are saved with the outputs of one run on `open-redirect-url-fragment` (YesWeHack's Vsnippet #19; the title line inside the file reads "Open Redirect Classic"), a PHP file from the [YesWeHack vulnerable code snippets](https://github.com/yeswehack/vulnerable-code-snippets) and one of the 23 files of the thesis' second experiment.

Bearer reports no finding for this file, so the run shows the model working without a static-analysis report: it identifies an open redirect (CWE-601) at line 39.

- The pipeline notebook continues with the self-reflection, the generated tests, three generation rounds that yield nine valid candidates, the three best candidates by entropy, and the selected patch.
- The baseline notebook shows the single patch the model returned.

## Pipeline versus baseline

| | Pipeline | Baseline |
|---|---|---|
| Bearer scan and vulnerability check | yes | yes |
| Decoding of the vulnerability check | greedy | sampling, temperature 0.9 |
| Security policy for the CWE in the patch prompt | yes | yes |
| Self-reflection | yes | no |
| Generated input/output tests with reasoning | yes | no |
| Candidate patches per run | up to 12 (3 rounds of 4) | 1 |
| Validation, de-duplication, entropy ranking | yes | no |
| Patch selection by the model | yes | no |

On the 23 files of the second experiment the pipeline repaired 15 and the baseline 12 (thesis, §5.1).
