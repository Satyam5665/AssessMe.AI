import { useTheme } from '@mui/material/styles';
import {
  Box,
  MenuItem,
  Select,
  Chip,
  OutlinedInput,
  InputLabel,
  FormControl,
} from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const jobTypes = ['Internship', 'Part-time', 'Full-time'];

function getStyles(job, jobType, theme) {
  return {
    fontWeight:
      jobType.indexOf(job) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({ jobType, setJobType }) {
  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setJobType(
      typeof value === 'string' ? value.split(',') : value
    );
  };

  return (
    <FormControl fullWidth margin='normal'>
      <InputLabel id='demo-multiple-chip-label'>Employment Title</InputLabel>
      <Select
        labelId='demo-multiple-chip-label'
        id='demo-multiple-chip'
        multiple
        value={jobType}
        onChange={handleChange}
        input={<OutlinedInput id='select-multiple-chip' label='Job Type' />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
        margin='dense'
      >
        {jobTypes.map((job) => (
          <MenuItem
            key={job}
            value={job}
            style={getStyles(job, jobType, theme)}
          >
            {job}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
