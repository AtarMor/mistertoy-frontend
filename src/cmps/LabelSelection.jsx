import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { toyService } from '../services/toy.service';

const labels = toyService.getLabels()

function getStyles(name, label, theme) {
    return {
        fontWeight:
            label.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export function LabelSelection({ toyToEdit, setToyToEdit }) {
    const theme = useTheme()
    console.log(toyToEdit);

    function handleChange({ target }) {
        const { value } = target
        setToyToEdit(prevToy => ({ ...prevToy, labels: typeof value === 'string' ? value.split(',') : value }))
    }

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-name-label">Label</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={toyToEdit.labels}
                    onChange={handleChange}
                    input={<OutlinedInput label="Name" />}
                >
                    {labels.map((l) => (
                        <MenuItem
                            key={l}
                            value={l}
                            style={getStyles(l, toyToEdit.labels, theme)}
                        >
                            {l}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}