## Compositional Diffusion with Guided search for Long-Horizon Planning


### Abstract
Generative models have emerged as powerful tools for planning, with compositional approaches 
offering particular promise for modeling long-horizon task distributions by composing together 
local, modular generative models. This compositional paradigm spans diverse domains, from multi-step 
manipulation planning to panoramic image synthesis to long video generation. However, compositional 
generative models face a critical challenge: when local distributions are multimodal, existing 
composition methods average incompatible modes, producing plans that are neither locally feasible nor 
globally coherent. We propose Compositional Diffusion with Guided Search (CDGS), which addresses 
this <i>mode averaging</i> problem by embedding search directly within the diffusion denoising process. 
Our method explores diverse combinations of local modes through population-based sampling, enforces 
global consistency through iterative resampling between overlapping segments, and prunes infeasible 
candidates using likelihood-based filtering. CDGS matches oracle performance on seven robot 
manipulation tasks, outperforming baselines that lack compositionality or require long-horizon training 
data. The approach generalizes across domains, enabling coherent text-guided panoramic images and 
long videos through effective local-to-global message passing.
