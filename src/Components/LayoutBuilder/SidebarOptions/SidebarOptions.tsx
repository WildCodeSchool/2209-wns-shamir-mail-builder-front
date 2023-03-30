import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  FormControlLabel,
  Grid, IconButton,
  Input,
  InputLabel,
  MenuItem, Popover, Radio,
  Select, Switch, Tooltip,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { MuiColorInput } from 'mui-color-input';
import {
  addSocialItem,
  change,
  changeGridInRowComponent,
  removeSocialItem, updateTextValueButton,
} from '../../../features/layout/layoutSlice';
import {
  COLUMN,
  GRID, GRID2, GRID2_1_3_L, GRID2_1_3_R, GRID3,
  ROW_COMPONENT, SIDEBAR_BUTTON_ITEM,
  SIDEBAR_IMAGE_ITEM, SIDEBAR_SOCIAL_ITEM,
} from '../DraggablesSidebar/DraggableBuilderComponentList';
import { updateSelectedComponent } from '../../../features/sidebar/slidebarSlice';
import Iconify from '../../Iconify';
import { generateSocialItem, socialItems } from '../../../helpers';

const SidebarOptionsWrapper = styled(Box)({
  maxHeight: 'calc(100vh - 180px)',
  overflowY: 'auto',
});

const SidebarOptionsBody = styled(Box)({
  '& > *:not(:last-child)': {
    marginBottom: '1rem',
  },
  padding: '0 .5rem 1rem 0',
});

const SidebarOptionsBodyItem = styled(Box)({
});
const SidebarOptions = () => {
  const selectedComponent = useSelector((state: any) => state.sidebarOptions);
  const [renderPropsState, setRenderPropsState] = useState(selectedComponent[0]?.renderProps);
  const [children, setChildren] = useState(selectedComponent[0]?.children);
  const [socialItemModal, setSocialItemModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const handleRenderPropsChange = (e: any) => {
    const { name, value } = e.target;
    setRenderPropsState((prevState: any) => ({
      ...prevState,
      style: {
        ...prevState?.style,
        [name]: value,
      },
    }));
  };
  const handleRenderPropsSubmit = () => {
    dispatch(change({
      path: selectedComponent[0]?.path,
      type: selectedComponent[0]?.type,
      renderProps: {
        style: {
          ...renderPropsState?.style,
        },
      },
    }));
  };

  useEffect(() => {
    setRenderPropsState(selectedComponent[0]?.renderProps);
    setChildren(selectedComponent[0]?.children);
  }, [selectedComponent]);

  useEffect(() => {
    if (renderPropsState !== selectedComponent[0]?.renderProps) {
      handleRenderPropsSubmit();
    }
  }, [renderPropsState]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      {selectedComponent.length ? (
        selectedComponent[0]?.type === ROW_COMPONENT ? (
          <SidebarOptionsWrapper>
            <SidebarOptionsBody>
              <SidebarOptionsBodyItem>
                <Typography
                  variant={'h5'}
                  sx={{
                    marginTop: '0',
                  }}
                >
                  Colonnes
                </Typography>
                <Box
                  sx={{
                    marginTop: '1rem',
                  }}
                >
                  <InputLabel id="columnLayout">Disposition des colonnes</InputLabel>
                  <Select
                    name={'columnLayout'}
                    value={selectedComponent[0]?.typeGrid}
                    onChange={(event) => {
                      dispatch(changeGridInRowComponent({
                        path: selectedComponent[0]?.path,
                        columnCount: selectedComponent[0]?.columnCount,
                        typeGrid: event.target.value,
                      }));
                      dispatch(updateSelectedComponent(
                        {
                          ...selectedComponent[0],
                          typeGrid: event.target.value,
                        },
                      ));
                    }}
                    // value={selectedComponent[0]?.typeGrid}
                    labelId="columnLayout"
                    style={{
                      width: '100%',
                    }}
                  >
                    {
                       [{
                         value: GRID,
                         label: '1 colonne',
                         columnCount: 1,
                         image: '/static/dragPreview/grid-1.png',
                       },
                       {
                         value: GRID2,
                         label: '2 colonnes',
                         columnCount: 2,
                         image: '/static/dragPreview/grid-2.png',
                       },
                       {
                         value: GRID2_1_3_L,
                         label: '2 colonnes (1/3 - 2/3)',
                         columnCount: 2,
                         image: '/static/dragPreview/grid-1-3-2-3.png',
                       },
                       {
                         value: GRID2_1_3_R,
                         label: '2 colonnes (2/3 - 1/3)',
                         columnCount: 2,
                         image: '/static/dragPreview/grid-2-3-1-3.png',
                       },
                       {
                         value: GRID3,
                         label: '3 colonnes',
                         columnCount: 3,
                         image: '/static/dragPreview/grid-3.png',
                       }].filter((item) => item.columnCount === selectedComponent[0]?.columnCount).map((item) => (
                         <MenuItem
                           value={item.value}
                           key={item.value}
                           style={{
                             backgroundColor: item.value === selectedComponent[0]?.typeGrid ? '#cccccc80' : 'transparent',
                           }}
                           selected={item.value === selectedComponent[0]?.typeGrid}
                         >
                           <Box>
                             <img
                               src={item.image}
                               alt={item.label}
                               style={{
                                 width: '100%',
                               }}
                             />
                             <Typography fontSize={13}>
                               {item.label}
                             </Typography>
                           </Box>
                         </MenuItem>
                       ))
                   }
                  </Select>
                </Box>

                <Box
                  sx={{
                    marginTop: '1rem',
                  }}
                >
                  <InputLabel
                    id="noWrapColumnInMobile"
                    shrink
                    style={{
                      textOverflow: 'unset',
                      whiteSpace: 'unset',
                      overflow: 'unset',
                    }}
                  >
                    Afficher les colonnes sur la même ligne sur mobile
                  </InputLabel>
                  <Switch
                    name={'noWrapColumnInMobile'}
                    checked={renderPropsState?.style?.noWrapColumnInMobile}
                    onChange={
                    (event) => {
                      handleRenderPropsChange({
                        target: {
                          name: 'noWrapColumnInMobile',
                          value: event.target.checked,
                        },
                      });
                    }
}
                  />
                </Box>
              </SidebarOptionsBodyItem>
              <SidebarOptionsBodyItem>
                <Typography
                  variant={'h5'}
                  sx={{
                    marginTop: '0',
                    marginBottom: '1rem',
                  }}
                >
                  Couleur
                </Typography>

                <InputLabel id="backgroundUrl">Couleur de fond</InputLabel>
                <MuiColorInput
                  disabled={renderPropsState?.style?.backgroundUrl}
                  value={renderPropsState?.style?.backgroundColor || 'transparent'}
                  onChange={
                  (color: any) => {
                    handleRenderPropsChange({
                      target: {
                        name: 'backgroundColor',
                        value: color,
                      },
                    });
                  }
                }
                />

                <FormControlLabel
                  control={(
                    <Switch
                      disabled={renderPropsState?.style?.backgroundUrl}
                      checked={renderPropsState?.style?.backgroundColor === 'transparent'}
                      onChange={(e) => {
                        handleRenderPropsChange({
                          target: {
                            name: 'backgroundColor',
                            value: e.target.checked ? 'transparent' : '#ffffff',
                          },
                        });
                      }}
                      name="backgroundColor"
                    />
                  )}
                  sx={{
                    color: '#637381',
                  }}
                  label="Transparent"
                />

                <FormControlLabel
                  control={(
                    <Switch
                      disabled={renderPropsState?.style?.backgroundUrl}
                      checked={renderPropsState?.style?.fullWidth === true}
                      onChange={(e) => {
                        handleRenderPropsChange({
                          target: {
                            name: 'fullWidth',
                            value: e.target.checked,
                          },
                        });
                      }}
                      name="fullWidth"
                    />
                  )}
                  label="Pleine largeur"
                />
              </SidebarOptionsBodyItem>

              <SidebarOptionsBodyItem>
                <Typography
                  variant={'h5'}
                  sx={{
                    marginTop: '0',
                  }}
                >
                  Image
                </Typography>
                <Box
                  sx={{
                    marginTop: '1rem',
                  }}
                >
                  <InputLabel id="backgroundUrl">
                    Image de fond
                    {
                      renderPropsState?.style?.backgroundUrl && (
                        <Box
                          sx={{
                            display: 'inline-block',
                            marginLeft: '1rem',
                            marginBottom: '0.5rem',
                          }}
                        >
                          <Button
                            variant={'outlined'}
                            size={'small'}
                            onClick={() => {
                              handleRenderPropsChange({
                                target: {
                                  name: 'backgroundUrl',
                                  value: '',
                                },
                              });
                            }}
                          >
                            Supprimer
                          </Button>
                        </Box>
                      )
                    }
                  </InputLabel>
                  <Input
                    type={'text'}
                    id={'backgroundUrl'}
                    name={'backgroundUrl'}
                    value={renderPropsState?.style?.backgroundUrl}
                    onChange={handleRenderPropsChange}
                    placeholder={'https://'}
                    style={{
                      display: 'block',
                    }}
                  />
                </Box>

                <Box
                  style={{
                    marginTop: '1rem',
                  }}
                >
                  <InputLabel id={'image-library'}>Mes images</InputLabel>
                  <Button
                    variant={'contained'}
                    size={'small'}
                    sx={{
                      mt: 1,
                    }}
                  >
                    Ma bibliothèque
                  </Button>
                </Box>

                <Box
                  sx={{
                    marginTop: '1rem',
                  }}
                >
                  <FormControlLabel
                    control={(
                      <Switch
                        checked={renderPropsState?.style?.fullWidth === true}
                        disabled={!renderPropsState?.style?.backgroundUrl}
                        onChange={(e) => {
                          handleRenderPropsChange({
                            target: {
                              name: 'fullWidth',
                              value: e.target.checked,
                            },
                          });
                        }}
                        name="fullWidth"
                      />
                    )}
                    label="Pleine largeur"
                  />
                </Box>

                <Box
                  sx={{
                    marginTop: '1rem',
                  }}
                >
                  <InputLabel id="backgroundSize">Taille de l'image</InputLabel>
                  <Select
                    name={'backgroundSize'}
                    onChange={handleRenderPropsChange}
                    value={renderPropsState?.style?.backgroundSize || ''}
                    labelId="backgroundSize"
                    disabled={!renderPropsState?.style?.backgroundUrl}
                    sx={{
                      width: '100%',
                    }}
                  >
                    <MenuItem value={'cover'}>Couvrir</MenuItem>
                    <MenuItem value={'contain'}>Contenir</MenuItem>
                  </Select>
                </Box>

                <Box
                  sx={{
                    marginTop: '1rem',
                  }}
                >
                  <InputLabel id="backgroundRepeat">Répétition de l'image</InputLabel>
                  <Select
                    name={'backgroundRepeat'}
                    onChange={handleRenderPropsChange}
                    value={renderPropsState?.style?.backgroundRepeat || 'no-repeat'}
                    labelId="backgroundRepeat"
                    disabled={!renderPropsState?.style?.backgroundUrl}
                    sx={{
                      width: '100%',
                    }}
                  >
                    <MenuItem value={'no-repeat'}>Non</MenuItem>
                    <MenuItem value={'repeat'}>Oui</MenuItem>
                  </Select>
                </Box>

                <Box
                  sx={{
                    marginTop: '1rem',
                  }}
                >
                  <InputLabel id="backgroundPosition">Position de l'image</InputLabel>
                  <Select
                    name={'backgroundPosition'}
                    onChange={handleRenderPropsChange}
                    value={renderPropsState?.style?.backgroundPosition || 'center'}
                    labelId="backgroundPosition"
                    disabled={!renderPropsState?.style?.backgroundUrl}
                    sx={{
                      width: '100%',
                    }}
                  >
                    <MenuItem value={'center'}>Centré</MenuItem>
                    <MenuItem value={'left'}>Gauche</MenuItem>
                    <MenuItem value={'right'}>Droite</MenuItem>
                    <MenuItem value={'top'}>Haut</MenuItem>
                    <MenuItem value={'bottom'}>Bas</MenuItem>
                  </Select>
                </Box>
              </SidebarOptionsBodyItem>

              <SidebarOptionsBodyItem>
                <Typography
                  variant={'h5'}
                  sx={{
                    marginTop: '0',
                  }}
                >
                  Bordure
                </Typography>

                <Box
                  sx={{
                    marginTop: '1rem',
                  }}
                >
                  <InputLabel id="borderStyle">Style de la bordure</InputLabel>
                  <Select
                    name={'borderStyle'}
                    onChange={handleRenderPropsChange}
                    value={renderPropsState?.style?.borderStyle || 'none'}
                    labelId="borderStyle"
                    sx={{
                      width: '100%',
                    }}
                  >
                    <MenuItem value={'none'}>Aucun</MenuItem>
                    <MenuItem value={'solid'}>Plein</MenuItem>
                    <MenuItem value={'dashed'}>Pointillé</MenuItem>
                    <MenuItem value={'dotted'}>Pointé</MenuItem>
                  </Select>
                </Box>

                <Box
                  sx={{
                    marginTop: '1rem',
                  }}
                >
                  <InputLabel id="borderColor">Couleur de la bordure</InputLabel>
                  <MuiColorInput
                    disabled={renderPropsState?.style?.borderStyle === 'none' || !renderPropsState?.style?.borderStyle}
                    value={renderPropsState?.style?.borderColor || 'transparent'}
                    onChange={
                      (color: any) => {
                        handleRenderPropsChange({
                          target: {
                            name: 'borderColor',
                            value: color,
                          },
                        });
                      }
                    }
                  />
                </Box>

                <Box
                  sx={{
                    marginTop: '1rem',
                  }}
                >
                  <InputLabel id="borderWidth">Largeur de la bordure</InputLabel>
                  <Input
                    type={'number'}
                    id={'borderWidth'}
                    name={'borderWidth'}
                    value={renderPropsState?.style?.borderWidth}
                    onChange={handleRenderPropsChange}
                    style={{
                      display: 'block',
                    }}
                    disabled={renderPropsState?.style?.borderStyle === 'none' || !renderPropsState?.style?.borderStyle}
                  />
                </Box>

                <Box
                  sx={{
                    marginTop: '1rem',
                  }}
                >
                  <InputLabel id="borderRadius">Arrondi de la bordure</InputLabel>
                  <Input
                    type={'number'}
                    id={'borderRadius'}
                    name={'borderRadius'}
                    value={renderPropsState?.style?.borderRadius}
                    onChange={handleRenderPropsChange}
                    placeholder={'0'}
                    style={{
                      display: 'block',
                    }}
                    disabled={renderPropsState?.style?.borderStyle === 'none' || !renderPropsState?.style?.borderStyle}
                  />
                </Box>
              </SidebarOptionsBodyItem>

              <SidebarOptionsBodyItem>
                <Typography
                  variant={'h5'}
                  sx={{
                    marginTop: '0',
                  }}
                >
                  Rembourrage
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        marginTop: '1rem',
                      }}
                    >
                      <InputLabel id="paddingTop">Haut</InputLabel>
                      <Input
                        type={'number'}
                        id={'paddingTop'}
                        name={'paddingTop'}
                        value={renderPropsState?.style?.paddingTop}
                        onChange={handleRenderPropsChange}
                        inputProps={{
                          min: 0,
                          max: 20,
                        }}
                        placeholder={'0'}
                        autoComplete={'false'}
                        style={{
                          display: 'block',
                        }}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Box
                      sx={{
                        marginTop: '1rem',
                      }}
                    >
                      <InputLabel id="paddingBottom">Bas</InputLabel>
                      <Input
                        type={'number'}
                        id={'paddingBottom'}
                        name={'paddingBottom'}
                        value={renderPropsState?.style?.paddingBottom || 0}
                        onChange={handleRenderPropsChange}
                        inputProps={{
                          min: 0,
                          max: 20,
                        }}
                        placeholder={'0'}
                        style={{
                          display: 'block',
                        }}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Box
                      sx={{
                        marginTop: '1rem',
                      }}
                    >
                      <InputLabel id="paddingLeft">Gauche</InputLabel>
                      <Input
                        type={'number'}
                        id={'paddingLeft'}
                        name={'paddingLeft'}
                        value={renderPropsState?.style?.paddingLeft || 0}
                        onChange={handleRenderPropsChange}
                        inputProps={{
                          min: 0,
                          max: 20,
                        }}
                        placeholder={'0'}
                        style={{
                          display: 'block',
                        }}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Box
                      sx={{
                        marginTop: '1rem',
                      }}
                    >
                      <InputLabel id="paddingRight">Droite</InputLabel>
                      <Input
                        type={'number'}
                        id={'paddingRight'}
                        name={'paddingRight'}
                        value={renderPropsState?.style?.paddingRight || 0}
                        onChange={handleRenderPropsChange}
                        inputProps={{
                          min: 0,
                          max: 20,
                        }}
                        placeholder={'0'}
                        style={{
                          display: 'block',
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </SidebarOptionsBodyItem>
            </SidebarOptionsBody>
          </SidebarOptionsWrapper>
        ) : selectedComponent[0].type === COLUMN ? (
          <SidebarOptionsWrapper>
            <SidebarOptionsBody>
              <SidebarOptionsBodyItem>
                <Typography
                  variant={'h5'}
                  sx={{
                    marginTop: '0',
                  }}
                >
                  Couleur
                </Typography>
                <Box
                  sx={{
                    marginTop: '1rem',
                  }}
                >
                  <InputLabel id="backgroundColor">Couleur de fond</InputLabel>
                  <MuiColorInput
                    id={'backgroundColor'}
                    name={'backgroundColor'}
                    value={renderPropsState?.style?.backgroundColor || 'transparent'}
                    onChange={(color: any) => {
                      handleRenderPropsChange({
                        target: {
                          name: 'backgroundColor',
                          value: color,
                        },
                      });
                    }}
                    style={{
                      display: 'block',
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    marginTop: '1rem',
                  }}
                >
                  <FormControlLabel
                    control={(
                      <Switch
                        checked={renderPropsState?.style?.backgroundColor === 'transparent'}
                        onChange={(e) => {
                          handleRenderPropsChange({
                            target: {
                              name: 'backgroundColor',
                              value: e.target.checked ? 'transparent' : '#CCCCCC80',
                            },
                          });
                        }}
                        name="backgroundColor"
                        color="primary"
                      />
                    )}
                    label="Transparent"
                  />
                </Box>
              </SidebarOptionsBodyItem>

              <SidebarOptionsBodyItem>
                <Typography
                  variant={'h5'}
                  sx={{
                    marginTop: '0',
                  }}
                >
                  Bordure
                </Typography>

                <Box
                  sx={{
                    marginTop: '1rem',
                  }}
                >
                  <InputLabel id="borderStyle">Style de la bordure</InputLabel>
                  <Select
                    name={'borderStyle'}
                    onChange={handleRenderPropsChange}
                    value={renderPropsState?.style?.borderStyle || 'none'}
                    labelId="borderStyle"
                    sx={{
                      width: '100%',
                    }}
                  >
                    <MenuItem value={'none'}>Aucun</MenuItem>
                    <MenuItem value={'solid'}>Plein</MenuItem>
                    <MenuItem value={'dashed'}>Pointillé</MenuItem>
                    <MenuItem value={'dotted'}>Pointé</MenuItem>
                  </Select>
                </Box>

                <Box
                  sx={{
                    marginTop: '1rem',
                  }}
                >
                  <InputLabel id="borderColor">Couleur de la bordure</InputLabel>
                  <MuiColorInput
                    disabled={renderPropsState?.style?.borderStyle === 'none' || !renderPropsState?.style?.borderStyle}
                    value={renderPropsState?.style?.borderColor || 'transparent'}
                    onChange={
                      (color: any) => {
                        handleRenderPropsChange({
                          target: {
                            name: 'borderColor',
                            value: color,
                          },
                        });
                      }
                    }
                  />
                </Box>

                <Box
                  sx={{
                    marginTop: '1rem',
                  }}
                >
                  <InputLabel id="borderWidth">Largeur de la bordure</InputLabel>
                  <Input
                    type={'number'}
                    id={'borderWidth'}
                    name={'borderWidth'}
                    value={renderPropsState?.style?.borderWidth}
                    onChange={handleRenderPropsChange}
                    style={{
                      display: 'block',
                    }}
                    disabled={renderPropsState?.style?.borderStyle === 'none' || !renderPropsState?.style?.borderStyle}
                  />
                </Box>

                <Box
                  sx={{
                    marginTop: '1rem',
                  }}
                >
                  <InputLabel id="borderRadius">Arrondi de la bordure</InputLabel>
                  <Input
                    type={'number'}
                    id={'borderRadius'}
                    name={'borderRadius'}
                    value={renderPropsState?.style?.borderRadius}
                    onChange={handleRenderPropsChange}
                    placeholder={'0'}
                    style={{
                      display: 'block',
                    }}
                    disabled={renderPropsState?.style?.borderStyle === 'none' || !renderPropsState?.style?.borderStyle}
                  />
                </Box>
              </SidebarOptionsBodyItem>

              <SidebarOptionsBodyItem>
                <Typography
                  variant={'h5'}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '0',
                  }}
                >
                  Alignement

                  <Tooltip title={'Attention, si vous souhaitez alignez verticalement la colonne au centre, les colonnes adjacentes doivent être alignées verticalement au centre également.'}>
                    <IconButton>
                      <Iconify
                        icon="mdi:information"
                        style={{
                          fontSize: '1.5rem',
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                </Typography>

                <Box
                  sx={{
                    marginTop: '1rem',
                  }}
                >
                  <InputLabel id="alignSelf">Alignement vertical</InputLabel>
                  <Select
                    name={'alignSelf'}
                    onChange={handleRenderPropsChange}
                    value={renderPropsState?.style?.alignSelf || 'center'}
                    labelId="alignSelf"
                    sx={{
                      width: '100%',
                    }}
                  >
                    <MenuItem value={'flex-start'} selected={renderPropsState?.style?.alignSelf === 'flex-start'}>Haut</MenuItem>
                    <MenuItem value={'center'} selected={renderPropsState?.style?.alignSelf === 'center'}>Milieu</MenuItem>
                    <MenuItem value={'flex-end'} selected={renderPropsState?.style?.alignSelf === 'flex-end'}>Bas</MenuItem>
                  </Select>
                </Box>
              </SidebarOptionsBodyItem>

              <SidebarOptionsBodyItem>
                <Typography
                  variant={'h5'}
                  sx={{
                    marginTop: '0',
                  }}
                >
                  Rembourrage
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        marginTop: '1rem',
                      }}
                    >
                      <InputLabel id="paddingTop">Haut</InputLabel>
                      <Input
                        type={'number'}
                        id={'paddingTop'}
                        name={'paddingTop'}
                        value={renderPropsState?.style?.paddingTop}
                        onChange={handleRenderPropsChange}
                        inputProps={{
                          min: 0,
                          max: 20,
                        }}
                        placeholder={'0'}
                        autoComplete={'false'}
                        style={{
                          display: 'block',
                        }}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Box
                      sx={{
                        marginTop: '1rem',
                      }}
                    >
                      <InputLabel id="paddingBottom">Bas</InputLabel>
                      <Input
                        type={'number'}
                        id={'paddingBottom'}
                        name={'paddingBottom'}
                        value={renderPropsState?.style?.paddingBottom || 0}
                        onChange={handleRenderPropsChange}
                        inputProps={{
                          min: 0,
                          max: 20,
                        }}
                        placeholder={'0'}
                        style={{
                          display: 'block',
                        }}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Box
                      sx={{
                        marginTop: '1rem',
                      }}
                    >
                      <InputLabel id="paddingLeft">Gauche</InputLabel>
                      <Input
                        type={'number'}
                        id={'paddingLeft'}
                        name={'paddingLeft'}
                        value={renderPropsState?.style?.paddingLeft || 0}
                        onChange={handleRenderPropsChange}
                        inputProps={{
                          min: 0,
                          max: 20,
                        }}
                        placeholder={'0'}
                        style={{
                          display: 'block',
                        }}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Box
                      sx={{
                        marginTop: '1rem',
                      }}
                    >
                      <InputLabel id="paddingRight">Droite</InputLabel>
                      <Input
                        type={'number'}
                        id={'paddingRight'}
                        name={'paddingRight'}
                        value={renderPropsState?.style?.paddingRight || 0}
                        onChange={handleRenderPropsChange}
                        inputProps={{
                          min: 0,
                          max: 20,
                        }}
                        placeholder={'0'}
                        style={{
                          display: 'block',
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </SidebarOptionsBodyItem>

            </SidebarOptionsBody>
          </SidebarOptionsWrapper>
        ) : selectedComponent[0].type === SIDEBAR_IMAGE_ITEM ? (
          <SidebarOptionsWrapper>
            <SidebarOptionsBody>
              <SidebarOptionsBodyItem>
                <Typography
                  variant={'h5'}
                  sx={{
                    marginTop: '0',
                  }}
                >
                  Image
                </Typography>
                <Box
                  sx={{
                    marginTop: '1rem',
                  }}
                >
                  <InputLabel id="backgroundUrl">
                    Lien de l'image
                    {
                      renderPropsState?.style?.backgroundUrl && (
                        <Box
                          sx={{
                            display: 'inline-block',
                            marginLeft: '1rem',
                            marginBottom: '0.5rem',
                          }}
                        >
                          <Button
                            variant={'outlined'}
                            size={'small'}
                            onClick={() => {
                              handleRenderPropsChange({
                                target: {
                                  name: 'backgroundUrl',
                                  value: '',
                                },
                              });
                            }}
                          >
                            Supprimer
                          </Button>
                        </Box>
                      )
                    }
                  </InputLabel>
                  <Input
                    type={'text'}
                    id={'backgroundUrl'}
                    name={'backgroundUrl'}
                    value={renderPropsState?.style?.backgroundUrl}
                    onChange={handleRenderPropsChange}
                    placeholder={'https://'}
                    style={{
                      display: 'block',
                    }}
                  />
                </Box>

                <Box
                  style={{
                    marginTop: '1rem',
                  }}
                >
                  <InputLabel id={'image-library'}>Mes images</InputLabel>
                  <Button
                    variant={'contained'}
                    size={'small'}
                    sx={{
                      mt: 1,
                    }}
                  >
                    Ma bibliothèque
                  </Button>
                </Box>

                <Box
                  sx={{
                    marginTop: '1rem',
                  }}
                >
                  <InputLabel
                    id="href"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    Lien de redirection
                    <Iconify
                      icon="material-symbols:link"
                      style={{
                        fontSize: '1.5rem',
                        marginLeft: '0.5rem',
                        color: '#9e9e9e',
                      }}
                    />
                  </InputLabel>
                  <Input
                    type={'text'}
                    id={'href'}
                    name={'href'}
                    value={renderPropsState?.style?.href}
                    onChange={handleRenderPropsChange}
                    placeholder={'https://'}
                    style={{
                      display: 'block',
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    marginTop: '1rem',
                  }}
                >
                  <InputLabel id="alt">Texte alternatif</InputLabel>
                  <Input
                    type={'text'}
                    id={'alt'}
                    name={'alt'}
                    value={renderPropsState?.style?.alt}
                    onChange={handleRenderPropsChange}
                    style={{
                      display: 'block',
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    marginTop: '1rem',
                  }}
                >
                  <FormControlLabel
                    control={(
                      <Switch
                        checked={renderPropsState?.style?.fullWidth}
                        onChange={(e) => {
                          handleRenderPropsChange({
                            target: {
                              name: 'fullWidth',
                              value: e.target.checked,
                            },
                          });
                        }}
                        name="fullWidth"
                        color="primary"
                      />
                  )}
                    label="Pleine largeur sur mobile"
                  />
                </Box>
              </SidebarOptionsBodyItem>

              <SidebarOptionsBodyItem>
                <Typography
                  variant={'h5'}
                  sx={{
                    marginTop: '0',
                  }}
                >
                  Taille
                </Typography>

                <Box
                  sx={{
                    marginTop: '1rem',
                  }}
                >
                  <InputLabel id="height">Hauteur</InputLabel>
                  <Input
                    type={'number'}
                    id={'height'}
                    name={'height'}
                    value={renderPropsState?.style?.height}
                    onChange={handleRenderPropsChange}
                    inputProps={{
                      min: 0,
                      max: 1000,
                    }}
                    placeholder={'0'}
                    style={{
                      display: 'block',
                    }}
                  />
                </Box>
              </SidebarOptionsBodyItem>

              <SidebarOptionsBodyItem>
                <Typography
                  variant={'h5'}
                  sx={{
                    marginTop: '0',
                  }}
                >
                  Bordure
                </Typography>

                <Box
                  sx={{
                    marginTop: '1rem',
                  }}
                >
                  <InputLabel id="borderStyle">Style de la bordure</InputLabel>
                  <Select
                    name={'borderStyle'}
                    onChange={handleRenderPropsChange}
                    value={renderPropsState?.style?.borderStyle || 'none'}
                    labelId="borderStyle"
                    sx={{
                      width: '100%',
                    }}
                  >
                    <MenuItem value={'none'}>Aucun</MenuItem>
                    <MenuItem value={'solid'}>Plein</MenuItem>
                    <MenuItem value={'dashed'}>Pointillé</MenuItem>
                    <MenuItem value={'dotted'}>Pointé</MenuItem>
                  </Select>
                </Box>

                <Box
                  sx={{
                    marginTop: '1rem',
                  }}
                >
                  <InputLabel id="borderColor">Couleur de la bordure</InputLabel>
                  <MuiColorInput
                    disabled={renderPropsState?.style?.borderStyle === 'none' || !renderPropsState?.style?.borderStyle}
                    value={renderPropsState?.style?.borderColor || 'transparent'}
                    onChange={
                      (color: any) => {
                        handleRenderPropsChange({
                          target: {
                            name: 'borderColor',
                            value: color,
                          },
                        });
                      }
                    }
                  />
                </Box>

                <Box
                  sx={{
                    marginTop: '1rem',
                  }}
                >
                  <InputLabel id="borderWidth">Largeur de la bordure</InputLabel>
                  <Input
                    type={'number'}
                    id={'borderWidth'}
                    name={'borderWidth'}
                    value={renderPropsState?.style?.borderWidth}
                    onChange={handleRenderPropsChange}
                    style={{
                      display: 'block',
                    }}
                    disabled={renderPropsState?.style?.borderStyle === 'none' || !renderPropsState?.style?.borderStyle}
                  />
                </Box>

                <Box
                  sx={{
                    marginTop: '1rem',
                  }}
                >
                  <InputLabel id="borderRadius">Arrondi de la bordure</InputLabel>
                  <Input
                    type={'number'}
                    id={'borderRadius'}
                    name={'borderRadius'}
                    value={renderPropsState?.style?.borderRadius}
                    onChange={handleRenderPropsChange}
                    placeholder={'0'}
                    style={{
                      display: 'block',
                    }}
                    disabled={renderPropsState?.style?.borderStyle === 'none' || !renderPropsState?.style?.borderStyle}
                  />
                </Box>
              </SidebarOptionsBodyItem>

              <SidebarOptionsBodyItem>
                <Typography
                  variant={'h5'}
                  sx={{
                    marginTop: '0',
                  }}
                >
                  Rembourrage
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        marginTop: '1rem',
                      }}
                    >
                      <InputLabel id="paddingTop">Haut</InputLabel>
                      <Input
                        type={'number'}
                        id={'paddingTop'}
                        name={'paddingTop'}
                        value={renderPropsState?.style?.paddingTop}
                        onChange={handleRenderPropsChange}
                        inputProps={{
                          min: 0,
                          max: 20,
                        }}
                        placeholder={'0'}
                        autoComplete={'false'}
                        style={{
                          display: 'block',
                        }}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Box
                      sx={{
                        marginTop: '1rem',
                      }}
                    >
                      <InputLabel id="paddingBottom">Bas</InputLabel>
                      <Input
                        type={'number'}
                        id={'paddingBottom'}
                        name={'paddingBottom'}
                        value={renderPropsState?.style?.paddingBottom || 0}
                        onChange={handleRenderPropsChange}
                        inputProps={{
                          min: 0,
                          max: 20,
                        }}
                        placeholder={'0'}
                        style={{
                          display: 'block',
                        }}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Box
                      sx={{
                        marginTop: '1rem',
                      }}
                    >
                      <InputLabel id="paddingLeft">Gauche</InputLabel>
                      <Input
                        type={'number'}
                        id={'paddingLeft'}
                        name={'paddingLeft'}
                        value={renderPropsState?.style?.paddingLeft || 0}
                        onChange={handleRenderPropsChange}
                        inputProps={{
                          min: 0,
                          max: 20,
                        }}
                        placeholder={'0'}
                        style={{
                          display: 'block',
                        }}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Box
                      sx={{
                        marginTop: '1rem',
                      }}
                    >
                      <InputLabel id="paddingRight">Droite</InputLabel>
                      <Input
                        type={'number'}
                        id={'paddingRight'}
                        name={'paddingRight'}
                        value={renderPropsState?.style?.paddingRight || 0}
                        onChange={handleRenderPropsChange}
                        inputProps={{
                          min: 0,
                          max: 20,
                        }}
                        placeholder={'0'}
                        style={{
                          display: 'block',
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </SidebarOptionsBodyItem>
            </SidebarOptionsBody>
          </SidebarOptionsWrapper>
        ) : selectedComponent[0].type === SIDEBAR_SOCIAL_ITEM ? (
          <SidebarOptionsWrapper>
            <SidebarOptionsBody>
              <SidebarOptionsBodyItem>
                <Typography
                  variant={'h5'}
                  sx={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '0',
                  }}
                >
                  Réseaux sociaux

                  <Iconify
                    icon={'mdi:plus'}
                    style={{
                      fontSize: '1.5rem',
                    }}
                    onClick={(e: React.MouseEvent<any>) => {
                      setSocialItemModal(true);
                      setAnchorEl(e.currentTarget);
                    }}
                  />

                  {
                    socialItemModal && (
                      <Popover
                        open={socialItemModal}
                        anchorEl={anchorEl}
                        onClose={() => {
                          setSocialItemModal(false);
                        }}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'center',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'center',
                        }}
                      >
                        <Box
                          sx={{
                            padding: '1rem',
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: '1',
                              marginTop: '0',
                            }}
                          >
                            Choisissez un réseau social
                          </Typography>

                          {
                            socialItems.map((item) => (
                              <Box
                                key={item.label}
                                sx={{
                                  marginTop: '1rem',
                                }}
                              >
                                <Typography
                                  variant={'h6'}
                                  sx={{
                                    marginTop: '0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '.5rem',
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '.5rem',
                                    }}
                                  >
                                    <img
                                      src={item.image}
                                      alt={'LinkedIn'}
                                      style={{
                                        width: '1.5rem',
                                      }}
                                    />
                                    <span>{item.label}</span>
                                  </Box>

                                  <Iconify
                                    icon={
                                      children?.find((child: any) => child.renderProps.style.alt === item.type) ? 'bi:dash' : 'mdi:plus'
                                    }
                                    style={{
                                      fontSize: '1.5rem',
                                    }}
                                    onClick={() => {
                                      if (children?.find((child: any) => child.renderProps.style.alt === item.type)) {
                                        setChildren(children?.filter((child: any) => child.renderProps.style.alt !== item.type));
                                        dispatch(
                                          removeSocialItem({
                                            itemPath: children?.indexOf(children?.find((child: any) => child.renderProps.style.alt === item.type)),
                                            path: selectedComponent[0].path,
                                          }),
                                        );
                                      } else {
                                        setChildren([
                                          ...children,
                                          generateSocialItem(item.type),
                                        ]);
                                        dispatch(
                                          addSocialItem({
                                            socialItem: generateSocialItem(item.type),
                                            path: selectedComponent[0].path,
                                          }),
                                        );
                                      }
                                    }}
                                  />
                                </Typography>
                              </Box>
                            ))
                          }
                        </Box>
                      </Popover>
                    )
                  }
                </Typography>

                {
                  children?.length > 0 && children.map((item: any, index: number) => (
                    <Box
                      key={`socialItem-${item.id}`}
                      sx={{
                        marginTop: '1rem',
                      }}
                    >
                      <Typography
                        variant={'h6'}
                        sx={{
                          marginTop: '0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '.5rem',
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '.5rem',
                          }}
                        >
                          <img
                            src={item.renderProps.style.src}
                            alt={item.renderProps.style.label}
                            style={{
                              width: '20px',
                              height: '20px',
                            }}
                          />
                          {item.renderProps.style.label}
                        </Box>

                        <Box
                          sx={{
                            width: '1.5rem',
                            height: '1.5rem',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            backgroundColor: 'rgba(0, 0, 0, .1)',
                            textAlign: 'center',
                          }}
                        >
                          <Iconify
                            icon={'mdi:delete'}
                            style={{
                              fontSize: '1rem',
                            }}
                            onClick={() => {
                              setChildren(
                                children.filter(
                                  (item: any, itemIndex: number) =>
                                    itemIndex !== index,
                                ),
                              );
                              dispatch(removeSocialItem({
                                path: selectedComponent[0].path,
                                itemPath: index,
                              }));
                            }}
                          />
                        </Box>
                      </Typography>

                      <InputLabel id="socialItem">Lien</InputLabel>

                      <Input
                        type={'text'}
                        id={'socialItem'}
                        name={'socialItem'}
                        value={children[index].renderProps.style.href}
                        onChange={(e) => {
                          setChildren(
                            children.map((item: any, itemIndex: number) => {
                              if (itemIndex === index) {
                                return {
                                  ...item,
                                  renderProps: {
                                    ...item.renderProps,
                                    style: {
                                      ...item.renderProps.style,
                                      href: e.target.value,
                                    },
                                  },
                                };
                              }
                              return item;
                            }),
                          );
                          dispatch(change({
                            type: SIDEBAR_SOCIAL_ITEM,
                            changeType: 'children',
                            id: item.id,
                            path: selectedComponent[0].path,
                            itemPath: index,
                            renderProps: {
                              ...item.renderProps,
                              style: {
                                ...item.renderProps.style,
                                href: e.target.value,
                              },
                            },
                          }));
                        }}
                        placeholder={'https://'}
                        style={{
                          display: 'block',
                        }}
                      />
                    </Box>
                  ))
                }

                {
                  children?.length > 0 && (
                  <>
                    <Box
                      sx={{
                        marginTop: '1rem',
                      }}
                    >
                      <InputLabel id="gap">Espacement entre les icones</InputLabel>
                      <Input
                        type={'number'}
                        id={'gap'}
                        name={'gap'}
                        value={renderPropsState?.style?.gap}
                        onChange={handleRenderPropsChange}
                        placeholder={'0'}
                        inputProps={
                          {
                            min: 0,
                            max: 15,
                          }
                        }
                        style={{
                          display: 'block',
                        }}
                      />
                    </Box>

                    <Box
                      sx={{
                        marginTop: '1rem',
                      }}
                    >
                      <InputLabel id="width">Taille des icones</InputLabel>
                      <Input
                        type={'number'}
                        id={'width'}
                        name={'width'}
                        value={renderPropsState?.style?.width}
                        onChange={handleRenderPropsChange}
                        placeholder={'0'}
                        style={{
                          display: 'block',
                        }}
                      />
                    </Box>
                  </>
                  )
                }
              </SidebarOptionsBodyItem>

              <SidebarOptionsBodyItem>
                <Typography
                  variant={'h5'}
                  sx={{
                    marginTop: '0',
                  }}
                >
                  Alignement horizontal
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  <FormControlLabel
                    control={(
                      <Radio
                        checked={renderPropsState?.style?.justifyContent === 'flex-start'}
                        onChange={handleRenderPropsChange}
                        value={'flex-start'}
                        name={'justifyContent'}
                      />
                    )}
                    label={'Gauche'}
                  />
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  <FormControlLabel
                    control={(
                      <Radio
                        checked={renderPropsState?.style?.justifyContent === 'center'}
                        onChange={handleRenderPropsChange}
                        value={'center'}
                        name={'justifyContent'}
                      />
                    )}
                    label={'Centre'}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  <FormControlLabel
                    control={(
                      <Radio
                        checked={renderPropsState?.style?.justifyContent === 'flex-end'}
                        onChange={handleRenderPropsChange}
                        value={'flex-end'}
                        name={'justifyContent'}
                      />
                    )}
                    label={'Droite'}
                  />
                </Box>
              </SidebarOptionsBodyItem>

              <SidebarOptionsBodyItem>
                <Typography
                  variant={'h5'}
                  sx={{
                    marginTop: '0',
                    marginBottom: '1rem',
                  }}
                >
                  Couleur
                </Typography>

                <InputLabel id="backgroundUrl">Couleur de fond</InputLabel>
                <MuiColorInput
                  disabled={renderPropsState?.style?.backgroundUrl}
                  value={renderPropsState?.style?.backgroundColor || 'transparent'}
                  onChange={
                    (color: any) => {
                      handleRenderPropsChange({
                        target: {
                          name: 'backgroundColor',
                          value: color,
                        },
                      });
                    }
                  }
                />

                <FormControlLabel
                  control={(
                    <Switch
                      disabled={renderPropsState?.style?.backgroundUrl}
                      checked={renderPropsState?.style?.backgroundColor === 'transparent'}
                      onChange={(e) => {
                        handleRenderPropsChange({
                          target: {
                            name: 'backgroundColor',
                            value: e.target.checked ? 'transparent' : '#ffffff',
                          },
                        });
                      }}
                      name="backgroundColor"
                    />
                  )}
                  sx={{
                    color: '#637381',
                  }}
                  label="Transparent"
                />
              </SidebarOptionsBodyItem>

              <SidebarOptionsBodyItem>
                <Typography
                  variant={'h5'}
                  sx={{
                    marginTop: '0',
                  }}
                >
                  Rembourrage
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        marginTop: '1rem',
                      }}
                    >
                      <InputLabel id="paddingTop">Haut</InputLabel>
                      <Input
                        type={'number'}
                        id={'paddingTop'}
                        name={'paddingTop'}
                        value={renderPropsState?.style?.paddingTop}
                        onChange={handleRenderPropsChange}
                        inputProps={{
                          min: 0,
                          max: 20,
                        }}
                        placeholder={'0'}
                        autoComplete={'false'}
                        style={{
                          display: 'block',
                        }}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Box
                      sx={{
                        marginTop: '1rem',
                      }}
                    >
                      <InputLabel id="paddingBottom">Bas</InputLabel>
                      <Input
                        type={'number'}
                        id={'paddingBottom'}
                        name={'paddingBottom'}
                        value={renderPropsState?.style?.paddingBottom || 0}
                        onChange={handleRenderPropsChange}
                        inputProps={{
                          min: 0,
                          max: 20,
                        }}
                        placeholder={'0'}
                        style={{
                          display: 'block',
                        }}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Box
                      sx={{
                        marginTop: '1rem',
                      }}
                    >
                      <InputLabel id="paddingLeft">Gauche</InputLabel>
                      <Input
                        type={'number'}
                        id={'paddingLeft'}
                        name={'paddingLeft'}
                        value={renderPropsState?.style?.paddingLeft || 0}
                        onChange={handleRenderPropsChange}
                        inputProps={{
                          min: 0,
                          max: 20,
                        }}
                        placeholder={'0'}
                        style={{
                          display: 'block',
                        }}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Box
                      sx={{
                        marginTop: '1rem',
                      }}
                    >
                      <InputLabel id="paddingRight">Droite</InputLabel>
                      <Input
                        type={'number'}
                        id={'paddingRight'}
                        name={'paddingRight'}
                        value={renderPropsState?.style?.paddingRight || 0}
                        onChange={handleRenderPropsChange}
                        inputProps={{
                          min: 0,
                          max: 20,
                        }}
                        placeholder={'0'}
                        style={{
                          display: 'block',
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </SidebarOptionsBodyItem>
            </SidebarOptionsBody>
          </SidebarOptionsWrapper>
        ) : selectedComponent[0].type === SIDEBAR_BUTTON_ITEM ? (
          <SidebarOptionsWrapper>
            <SidebarOptionsBody>
              <SidebarOptionsBodyItem>
                <Typography
                  variant={'h5'}
                  sx={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '0',
                  }}
                >
                  Bouton
                </Typography>
              </SidebarOptionsBodyItem>

              <SidebarOptionsBodyItem>
                <Box
                  sx={{
                    marginTop: '1rem',
                  }}
                >
                  <InputLabel id="text">Texte du bouton</InputLabel>
                  <Input
                    type={'text'}
                    id={'text'}
                    name={'text'}
                    value={renderPropsState?.text}
                    onChange={(e) => {
                      setRenderPropsState({
                        ...renderPropsState,
                        text: e.target.value,
                      });
                      dispatch(updateTextValueButton({
                        path: selectedComponent[0].path,
                        value: e.target.value,
                      }));
                    }}
                    style={{
                      display: 'block',
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    marginTop: '1rem',
                  }}
                >
                  <InputLabel id="href">Lien de redirection</InputLabel>
                  <Input
                    type={'text'}
                    id={'href'}
                    name={'href'}
                    value={renderPropsState?.style.href}
                    onChange={handleRenderPropsChange}
                    placeholder={'https://'}
                    style={{
                      display: 'block',
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    marginTop: '1rem',
                  }}
                >
                  <InputLabel id="title">Titre</InputLabel>
                  <Input
                    type={'text'}
                    id={'title'}
                    name={'title'}
                    value={renderPropsState?.style.title}
                    onChange={handleRenderPropsChange}
                    style={{
                      display: 'block',
                    }}
                  />
                </Box>
              </SidebarOptionsBodyItem>

              <SidebarOptionsBodyItem>
                <Typography
                  variant={'h5'}
                  sx={{
                    marginTop: '0',
                  }}
                >
                  Alignement
                </Typography>

                <Box
                  sx={{
                    marginTop: '1rem',
                  }}
                >
                  <InputLabel id="justifyContent">Alignement horizontal</InputLabel>
                  <Select
                    labelId="justifyContent"
                    id="justifyContent"
                    name={'justifyContent'}
                    value={renderPropsState?.style?.justifyContent || 'flex-start'}
                    onChange={handleRenderPropsChange}
                    style={{
                      width: '100%',
                    }}
                  >
                    <MenuItem value={'flex-start'}>Gauche</MenuItem>
                    <MenuItem value={'center'}>Centre</MenuItem>
                    <MenuItem value={'flex-end'}>Droite</MenuItem>
                  </Select>
                </Box>
              </SidebarOptionsBodyItem>

              <SidebarOptionsBodyItem>
                <Typography
                  variant={'h5'}
                  sx={{
                    marginTop: '0',
                  }}
                >
                  Apparence du texte
                </Typography>

                <Box
                  sx={{
                    marginTop: '1rem',
                  }}
                >
                  <InputLabel id="fontFamily">Police</InputLabel>
                  <Select
                    labelId="fontFamily"
                    id="fontFamily"
                    name={'fontFamily'}
                    value={renderPropsState?.style?.fontFamily || 'Roboto'}
                    onChange={handleRenderPropsChange}
                    style={{
                      width: '100%',
                    }}
                  >
                    <MenuItem value={'Roboto'}>Roboto</MenuItem>
                    <MenuItem value={'Arial'}>Arial</MenuItem>
                    <MenuItem value={'Times New Roman'}>Times New Roman</MenuItem>
                    <MenuItem value={'Verdana'}>Verdana</MenuItem>
                    <MenuItem value={'Courier New'}>Courier New</MenuItem>
                  </Select>
                </Box>

                <Box
                  sx={{
                    marginTop: '1rem',
                  }}
                >
                  <InputLabel id="fontSize">Taille</InputLabel>
                  <Input
                    type={'number'}
                    id={'fontSize'}
                    name={'fontSize'}
                    value={renderPropsState?.style?.fontSize}
                    onChange={handleRenderPropsChange}
                    inputProps={{
                      min: 0,
                      max: 20,
                    }}
                    placeholder={'0'}
                    style={{
                      display: 'block',
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    marginTop: '1rem',
                  }}
                >
                  <InputLabel id="fontWeight">Epaisseur</InputLabel>
                  <Select
                    labelId="fontWeight"
                    id="fontWeight"
                    name={'fontWeight'}
                    value={renderPropsState?.style?.fontWeight || 'normal'}
                    onChange={handleRenderPropsChange}
                    style={{
                      width: '100%',
                    }}
                  >
                    <MenuItem value={'normal'}>Normal</MenuItem>
                    <MenuItem value={'bold'}>Gras</MenuItem>
                  </Select>
                </Box>

                <Box
                  sx={{
                    marginTop: '1rem',
                  }}
                >
                  <InputLabel id="letterSpacing">Espacement des lettres</InputLabel>
                  <Input
                    type={'number'}
                    id={'letterSpacing'}
                    name={'letterSpacing'}
                    value={renderPropsState?.style?.letterSpacing || 0}
                    onChange={handleRenderPropsChange}
                    inputProps={{
                      min: 0,
                      max: 20,
                    }}
                    placeholder={'0'}
                    style={{
                      display: 'block',
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    marginTop: '1rem',
                  }}
                >
                  <InputLabel id="lineHeight">Hauteur de ligne</InputLabel>
                  <Input
                    type={'number'}
                    id={'lineHeight'}
                    name={'lineHeight'}
                    value={renderPropsState?.style?.lineHeight}
                    onChange={handleRenderPropsChange}
                    inputProps={{
                      min: 0,
                      max: 20,
                    }}
                    placeholder={'0'}
                    style={{
                      display: 'block',
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    marginTop: '1rem',
                  }}
                >
                  <InputLabel id="textAlign">Alignement</InputLabel>
                  <Select
                    labelId="textAlign"
                    id="textAlign"
                    name={'textAlign'}
                    value={renderPropsState?.style?.textAlign || 'center'}
                    onChange={handleRenderPropsChange}
                    style={{
                      width: '100%',
                    }}
                  >
                    <MenuItem value={'left'}>Gauche</MenuItem>
                    <MenuItem value={'center'}>Centre</MenuItem>
                    <MenuItem value={'right'}>Droite</MenuItem>
                  </Select>
                </Box>

                <Box
                  sx={{
                    marginTop: '1rem',
                  }}
                >
                  <InputLabel id="textDecoration">Soulignement</InputLabel>
                  <Select
                    labelId="textDecoration"
                    id="textDecoration"
                    name={'textDecoration'}
                    value={renderPropsState?.style?.textDecoration || 'none'}
                    onChange={handleRenderPropsChange}
                    style={{
                      width: '100%',
                    }}
                  >
                    <MenuItem value={'none'}>Aucun</MenuItem>
                    <MenuItem value={'underline'}>Souligné</MenuItem>
                  </Select>
                </Box>

                <Box
                  sx={{
                    marginTop: '1rem',
                  }}
                >
                  <InputLabel id="textTransform">Transformation du texte</InputLabel>
                  <Select
                    labelId="textTransform"
                    id="textTransform"
                    name={'textTransform'}
                    value={renderPropsState?.style?.textTransform || 'uppercase'}
                    onChange={handleRenderPropsChange}
                    style={{
                      width: '100%',
                    }}
                  >
                    <MenuItem value={'none'}>Aucun</MenuItem>
                    <MenuItem value={'uppercase'}>Majuscules</MenuItem>
                    <MenuItem value={'lowercase'}>Minuscules</MenuItem>
                    <MenuItem value={'capitalize'}>Première lettre en majuscule</MenuItem>
                  </Select>
                </Box>
              </SidebarOptionsBodyItem>

              <SidebarOptionsBodyItem>
                <Typography
                  variant={'h6'}
                  component={'h6'}
                  sx={{
                    marginBottom: '1rem',
                  }}
                >
                  Couleurs
                </Typography>

                <Box
                  sx={{
                    marginTop: '1rem',
                  }}
                >
                  <InputLabel id="color">Couleur du texte</InputLabel>
                  <MuiColorInput
                    id={'color'}
                    name={'color'}
                    value={renderPropsState?.style?.color}
                    onChange={(value) => {
                      handleRenderPropsChange({
                        target: {
                          name: 'color',
                          value,
                        },
                      });
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    marginTop: '1rem',
                  }}
                >
                  <InputLabel id="backgroundColor">Couleur de fond</InputLabel>
                  <MuiColorInput
                    id={'backgroundColor'}
                    name={'backgroundColor'}
                    value={renderPropsState?.style?.backgroundColor}
                    onChange={(value) => {
                      handleRenderPropsChange({
                        target: {
                          name: 'backgroundColor',
                          value,
                        },
                      });
                    }}
                  />
                </Box>
              </SidebarOptionsBodyItem>

              <SidebarOptionsBodyItem>
                <Typography
                  variant={'h6'}
                  component={'h6'}
                  sx={{
                    marginBottom: '1rem',
                  }}
                >
                  Rembourrage
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <InputLabel id="innerPaddingTop">Haut</InputLabel>
                    <Input
                      type={'number'}
                      id={'innerPaddingTop'}
                      name={'innerPaddingTop'}
                      value={renderPropsState?.style?.innerPaddingTop}
                      onChange={handleRenderPropsChange}
                      inputProps={{
                        min: 0,
                        max: 20,
                      }}
                      placeholder={'0'}
                      style={{
                        display: 'block',
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel id="paddingBottom">Bas</InputLabel>
                    <Input
                      type={'number'}
                      id={'innerPaddingBottom'}
                      name={'innerPaddingBottom'}
                      value={renderPropsState?.style?.innerPaddingBottom}
                      onChange={handleRenderPropsChange}
                      inputProps={{
                        min: 0,
                        max: 20,
                      }}
                      placeholder={'0'}
                      style={{
                        display: 'block',
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel id="paddingLeft">Gauche</InputLabel>
                    <Input
                      type={'number'}
                      id={'innerPaddingLeft'}
                      name={'innerPaddingLeft'}
                      value={renderPropsState?.style?.innerPaddingLeft}
                      onChange={handleRenderPropsChange}
                      inputProps={{
                        min: 0,
                        max: 20,
                      }}
                      placeholder={'0'}
                      style={{
                        display: 'block',
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel id="paddingRight">Droite</InputLabel>
                    <Input
                      type={'number'}
                      id={'innerPaddingRight'}
                      name={'innerPaddingRight'}
                      value={renderPropsState?.style?.innerPaddingRight}
                      onChange={handleRenderPropsChange}
                      inputProps={{
                        min: 0,
                        max: 20,
                      }}
                      placeholder={'0'}
                      style={{
                        display: 'block',
                      }}
                    />
                  </Grid>
                </Grid>
              </SidebarOptionsBodyItem>

              <SidebarOptionsBodyItem>
                <Typography
                  variant={'h6'}
                  component={'h6'}
                  sx={{
                    marginBottom: '1rem',
                  }}
                >
                  Rembourrage extérieur
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <InputLabel id="paddingTop">Haut</InputLabel>
                    <Input
                      type={'number'}
                      id={'paddingTop'}
                      name={'paddingTop'}
                      value={renderPropsState?.style?.paddingTop}
                      onChange={handleRenderPropsChange}
                      inputProps={{
                        min: 0,
                        max: 20,
                      }}
                      placeholder={'0'}
                      style={{
                        display: 'block',
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel id="paddingBottom">Bas</InputLabel>
                    <Input
                      type={'number'}
                      id={'paddingBottom'}
                      name={'paddingBottom'}
                      value={renderPropsState?.style?.paddingBottom}
                      onChange={handleRenderPropsChange}
                      inputProps={{
                        min: 0,
                        max: 20,
                      }}
                      placeholder={'0'}
                      style={{
                        display: 'block',
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel id="paddingLeft">Gauche</InputLabel>
                    <Input
                      type={'number'}
                      id={'paddingLeft'}
                      name={'paddingLeft'}
                      value={renderPropsState?.style?.paddingLeft}
                      onChange={handleRenderPropsChange}
                      inputProps={{
                        min: 0,
                        max: 20,
                      }}
                      placeholder={'0'}
                      style={{
                        display: 'block',
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel id="paddingRight">Droite</InputLabel>
                    <Input
                      type={'number'}
                      id={'paddingRight'}
                      name={'paddingRight'}
                      value={renderPropsState?.style?.paddingRight}
                      onChange={handleRenderPropsChange}
                      inputProps={{
                        min: 0,
                        max: 20,
                      }}
                      placeholder={'0'}
                      style={{
                        display: 'block',
                      }}
                    />
                  </Grid>
                </Grid>
              </SidebarOptionsBodyItem>

            </SidebarOptionsBody>
          </SidebarOptionsWrapper>
        ) : undefined
      ) : undefined}
    </Box>
  );
};
export default SidebarOptions;
