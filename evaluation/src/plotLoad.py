import os
import re
import numpy as np
from datetime import datetime
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from scipy.ndimage import gaussian_filter1d

filepath = "./Projects/greenexam/backend/logs/sys.log"

with open(filepath, 'r') as file:
        log_data = file.readlines()

# Initialize lists to store the extracted data
timestamps = []
cpu_loads = []
ram_loads = []
system_states = []
num_users = []

# Extract data from each line in the log file
for line in log_data:
    timestamp = line.split(' [SYS]: ')[0]
    match = re.search(r'"state":([0-5]),"users":([0-9]+),"CPULoad":([0-9.]+),"RAMLoad":([0-9.]+)', line)
    if match:
        state = int(match.group(1))
        users = int(match.group(2))
        cpu_load = float(match.group(3))
        ram_load = float(match.group(4))
        timestamps.append(timestamp)
        cpu_loads.append(cpu_load)
        ram_loads.append(ram_load)
        system_states.append(state)
        num_users.append(users)


# Convert timestamps to sequential integers
timestamps = list(range(len(timestamps)))

# Smoothing the CPU and RAM loads
cpu_loads_smooth = gaussian_filter1d(cpu_loads, sigma=2)
ram_loads_smooth = gaussian_filter1d(ram_loads, sigma=2)

# Define state colors
state_colors = {
    1: '#98FB98',  # Mint Green
    2: '#B2E2E2',  # Seafoam Green
    3: '#FADA5E',  # Sunflower Yellow
    4: '#FFDAB9',  # Peach Orange
    5: '#FF6F61'   # Rose Red
}

# Define state names
state_names = {
    1: 'FULL_FEATURES',
    2: 'ON_DEMAND_EXECUTION',
    3: 'THROTTLED_EXECUTION',
    4: 'CLIENT_SIDE_PROCESSING',
    5: 'MINIMAL_COMPILATION'
}

# Plotting
plt.figure(figsize=(12, 8))
ax1 = plt.gca()

# Plot CPU and RAM loads
ax1.plot(timestamps, cpu_loads_smooth, label='CPU Load', color='#008080')
ax1.plot(timestamps, ram_loads_smooth, label='RAM Load', color='#9370DB')
ax1.set_xlabel('Time')
ax1.set_ylabel('Load (%)')
ax1.tick_params(axis='y')

# Plot colored backgrounds for system states
for i in range(len(timestamps) - 1):
    ax1.axvspan(timestamps[i], timestamps[i + 1], color=state_colors[system_states[i]], alpha=0.3)

# Secondary y-axis for number of users
ax2 = ax1.twinx()
ax2.step(timestamps, num_users, where='post', color='#FF7F50', label='Number of Users')
#ax2.scatter(timestamps, num_users, color='purple', label='Number of Users', alpha=0.7)
ax2.set_ylabel('Number of Users')
ax2.tick_params(axis='y')

# Create custom legend for states
state_legend = [mpatches.Patch(color=color, label=name) for name, color in zip(state_names.values(), state_colors.values())]
plt.legend(handles=state_legend, loc='upper center', bbox_to_anchor=(0.5, 1.15), ncol=3)

# Setting plot title and layout
plt.title('CPU, RAM Load, System State, and User Count Over Time')
ax1.legend(loc='upper left')
ax2.legend(loc='upper right')
plt.xticks(np.arange(0, len(timestamps), step=max(1, len(timestamps) // 10)), rotation=45)
plt.tight_layout()
plt.show()