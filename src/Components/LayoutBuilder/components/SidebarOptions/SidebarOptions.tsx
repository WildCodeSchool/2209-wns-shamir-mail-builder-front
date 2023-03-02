import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { change } from '../../../../features/layout/layoutSlice';
import { COLUMN, CONTAINER, ROW_COMPONENT, SIDEBAR_IMAGE_ITEM } from '../DraggablesSidebar/DraggableBuilderComponentList';

const SidebarOptions = () => {
  const selectedComponent = useSelector((state: any) => state.sidebarOptions);
  const layout = useSelector((state: any) => state.layout);
  const [renderPropsState, setRenderPropsState] = useState(selectedComponent[0]?.renderProps);
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
  }, [selectedComponent]);

  useEffect(() => {
    if (renderPropsState !== selectedComponent[0]?.renderProps) {
      handleRenderPropsSubmit();
    }
  }, [renderPropsState]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {selectedComponent.length ? (
        selectedComponent[0]?.type === ROW_COMPONENT ? (
          <div className="sidebar-options">
            <div className="sidebar-options__header">
              <h4>
                Liste des
                options:
                {selectedComponent[0].type}
                {' '}
                {selectedComponent[0].type === 'row' ? selectedComponent[0].path : selectedComponent[0].path.split('-')[1]}
              </h4>
            </div>
            <div className="sidebar-options__body">
              <form onSubmit={handleRenderPropsSubmit}>
                <div
                  className="sidebar-options__body__item"
                  style={{
                    outline: '2px solid #ccc',
                    padding: '10px',
                  }}
                >
                  <h4 style={{
                    marginTop: '0',
                  }}
                  >
                    Couleur
                  </h4>
                  <label htmlFor="title">
                    Couleur de fond
                    <input
                      type={'color'}
                      name={'backgroundColor'}
                      value={renderPropsState?.style?.backgroundColor}
                      onChange={handleRenderPropsChange}
                    />
                  </label>
                </div>
                <br />
                <div
                  className="sidebar-options__body__item"
                  style={{
                    outline: '2px solid #ccc',
                    padding: '10px',
                  }}
                >
                  <h4 style={{
                    marginTop: '0',
                  }}
                  >
                    Image de fond
                  </h4>
                  <label htmlFor="title">
                    Lien de l'image
                    <input
                      type={'text'}
                      name={'backgroundImage'}
                      placeholder={'https://mon-image.jpg'}
                      value={renderPropsState?.style?.backgroundImage}
                      onChange={handleRenderPropsChange}
                    />
                  </label>
                  <br />
                  {' '}
                  <br />
                  <label htmlFor="title">
                    Choisir une image
                    <input
                      type={'file'}
                      name={'backgroundImage'}
                      onChange={handleRenderPropsChange}
                    />

                  </label>

                  {/*  Proprieté image de fond */}
                  <h4>Remplissage de l'image</h4>
                  <label htmlFor={'image'}>
                    <input
                      type="radio"
                      name="backgroundSize"
                      value="cover"
                      checked={renderPropsState?.style?.backgroundSize === 'cover'}
                      onChange={handleRenderPropsChange}
                    />
                    Cover
                  </label>
                  <label htmlFor="title">
                    <input
                      type="radio"
                      name="backgroundSize"
                      value="contain"
                      checked={renderPropsState?.style?.backgroundSize === 'contain'}
                      onChange={handleRenderPropsChange}
                    />
                    Contain
                  </label>
                  <label htmlFor="title">
                    <input
                      type="radio"
                      name="backgroundSize"
                      value="auto"
                      checked={renderPropsState?.style?.backgroundSize === 'auto'}
                      onChange={handleRenderPropsChange}
                    />
                    Auto
                  </label>

                  <h4>Position de l'image</h4>
                  {/*  Proprieté position image de fond */}
                  <label htmlFor="title">
                    <input
                      type="radio"
                      name="backgroundPosition"
                      value="center"
                      checked={renderPropsState?.style?.backgroundPosition === 'center'}
                      onChange={handleRenderPropsChange}
                    />
                    Center
                  </label>
                  <br />
                  <label htmlFor="title">
                    <input
                      type="radio"
                      name="backgroundPosition"
                      value="top"
                      checked={renderPropsState?.style?.backgroundPosition === 'top'}
                      onChange={handleRenderPropsChange}
                    />
                    Top
                  </label>
                  <br />
                  <label htmlFor="title">
                    <input
                      type="radio"
                      name="backgroundPosition"
                      value="bottom"
                      checked={renderPropsState?.style?.backgroundPosition === 'bottom'}
                      onChange={handleRenderPropsChange}
                    />
                    Bottom
                  </label>
                  <br />
                  <label htmlFor="title">
                    <input
                      type="radio"
                      name="backgroundPosition"
                      value="left"
                      checked={renderPropsState?.style?.backgroundPosition === 'left'}
                      onChange={handleRenderPropsChange}
                    />
                    Left
                  </label>
                  <br />
                  <label htmlFor="title">
                    <input
                      type="radio"
                      name="backgroundPosition"
                      value="right"
                      checked={renderPropsState?.style?.backgroundPosition === 'right'}
                      onChange={handleRenderPropsChange}
                    />
                    Right
                  </label>
                  <br />
                  {' '}
                  <br />
                  <label htmlFor="title">
                    Axe X
                    {' '}
                    <br />
                    <input
                      type={'text'}
                      name={'backgroundPositionX'}
                      value={renderPropsState?.style?.backgroundPositionX}
                      onChange={handleRenderPropsChange}
                    />
                  </label>
                  <br />
                  <label htmlFor="title">
                    Axe Y
                    {' '}
                    <br />
                    <input
                      type={'text'}
                      name={'backgroundPositionY'}
                      value={renderPropsState?.style?.backgroundPositionY}
                      onChange={handleRenderPropsChange}
                    />
                  </label>

                  <h4>Répétitions de l'image</h4>
                  {/*  Proprieté répétition image de fond */}
                  <label htmlFor="title">
                    <input
                      type="radio"
                      name="backgroundRepeat"
                      value="no-repeat"
                      checked={renderPropsState?.style?.backgroundRepeat === 'no-repeat'}
                      onChange={handleRenderPropsChange}
                    />
                    No-repeat
                  </label>
                  <br />
                  <label htmlFor="title">
                    <input
                      type="radio"
                      name="backgroundRepeat"
                      value="repeat"
                      checked={renderPropsState?.style?.backgroundRepeat === 'repeat'}
                      onChange={handleRenderPropsChange}
                    />
                    Repeat
                  </label>
                  <br />
                  <label htmlFor="title">
                    <input
                      type="radio"
                      name="backgroundRepeat"
                      value="repeat-x"
                      checked={renderPropsState?.style?.backgroundRepeat === 'repeat-x'}
                      onChange={handleRenderPropsChange}
                    />
                    Repeat-x
                  </label>
                  <br />
                  <label htmlFor="title">
                    <input
                      type="radio"
                      name="backgroundRepeat"
                      value="repeat-y"
                      checked={renderPropsState?.style?.backgroundRepeat === 'repeat-y'}
                      onChange={handleRenderPropsChange}
                    />
                    Repeat-y
                  </label>

                  {/* <h4>Alignement des colonnes</h4> */}
                  {/* <label htmlFor=""> */}
                  {/*  <input */}
                  {/*    type="radio" */}
                  {/*    name="alignItems" */}
                  {/*    value="flex-start" */}
                  {/*    checked={renderPropsState?.style?.alignItems === "flex-start"} */}
                  {/*    onChange={handleRenderPropsChange} */}
                  {/*  /> */}
                  {/*  Gauche */}
                  {/* </label> */}
                  {/* <br/> */}
                  {/* <label htmlFor=""> */}
                  {/*  <input */}
                  {/*    type="radio" */}
                  {/*    name="alignItems" */}
                  {/*    value="center" */}
                  {/*    checked={renderPropsState?.style?.alignItems === "center"} */}
                  {/*    onChange={handleRenderPropsChange} */}
                  {/*  /> */}
                  {/*  Centre */}
                  {/* </label> */}
                  {/* <br/> */}
                  {/* <label htmlFor=""> */}
                  {/*  <input */}
                  {/*    type="radio" */}
                  {/*    name="alignItems" */}
                  {/*    value="flex-end" */}
                  {/*    checked={renderPropsState?.style?.alignItems === "flex-end"} */}
                  {/*    onChange={handleRenderPropsChange} */}
                  {/*  /> */}
                  {/*  Droite */}
                  {/* </label> */}
                  {/* <br/> */}
                  {/* <label htmlFor=""> */}
                  {/*  <input */}
                  {/*    type="radio" */}
                  {/*    name="alignItems" */}
                  {/*    value="stretch" */}
                  {/*    checked={renderPropsState?.style?.alignItems === "stretch"} */}
                  {/*    onChange={handleRenderPropsChange} */}
                  {/*  /> */}
                  {/*  Etirer */}
                  {/* </label> */}
                </div>
                <div
                  className="sidebar-options__body__item"
                  style={{
                    outline: '2px solid #ccc',
                    padding: '10px',
                    marginTop: '1rem',
                  }}
                >
                  <h4 style={{
                    marginTop: '0',
                  }}
                  >
                    Marge extérieurs
                  </h4>
                  <div className="sidebar-options__body__item">
                    <label htmlFor="title">
                      Haut
                      <input
                        type={'text'}
                        name={'marginTop'}
                        value={renderPropsState?.style?.marginTop}
                        onChange={handleRenderPropsChange}
                      />

                    </label>
                    <br />
                    <br />
                    <label htmlFor="title">
                      Bas
                      <input
                        type={'text'}
                        name={'marginBottom'}
                        value={renderPropsState?.style?.marginBottom}
                        onChange={handleRenderPropsChange}
                      />
                    </label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        ) : selectedComponent[0].type === COLUMN ? (
          <div className="sidebar-options">
            <div className="sidebar-options__header">
              <h4>
                Liste des
                options:
                {' '}
              </h4>
            </div>
            <div className="sidebar-options__body">
              <form>
                {
                  selectedComponent[0]?.isResizable && (
                    <div
                      className="sidebar-options__body__item"
                      style={{
                        outline: '2px solid #ccc',
                        padding: '10px',
                        marginTop: '1rem',
                      }}
                    >
                      <h4 style={{
                        marginTop: '0',
                      }}
                      >
                        Dimensions
                      </h4>
                      <div className="sidebar-options__body__item">
                        <label htmlFor="title">
                          Largeur
                          <input
                            type={'text'}
                            name={'flexBasis'}
                            value={renderPropsState?.style?.flexBasis}
                            onChange={handleRenderPropsChange}
                          />
                        </label>
                      </div>
                    </div>
                  )
                }

                <div
                  className="sidebar-options__body__item"
                  style={{
                    outline: '2px solid #ccc',
                    padding: '10px',
                    marginTop: '1rem',
                  }}
                >
                  <h4 style={{
                    marginTop: '0',
                  }}
                  >
                    Alignement vertical
                  </h4>
                  <label htmlFor="titletitle">
                    <input
                      type="radio"
                      name={'alignSelf'}
                      value={'flex-start'}
                      checked={renderPropsState?.style?.alignSelf === 'flex-start'}
                      onChange={handleRenderPropsChange}
                    />
                    Haut
                  </label>
                  <br />
                  <label htmlFor="title">
                    <input
                      type="radio"
                      name={'alignSelf'}
                      value={'center'}
                      checked={renderPropsState?.style?.alignSelf === 'center'}
                      onChange={handleRenderPropsChange}
                    />
                    Centre
                  </label>
                  <br />
                  <label htmlFor="title">
                    <input
                      type="radio"
                      name={'alignSelf'}
                      value={'flex-end'}
                      checked={renderPropsState?.style?.alignSelf === 'flex-end'}
                      onChange={handleRenderPropsChange}
                    />
                    Bas
                  </label>
                  <br />
                  <label htmlFor="title">
                    <input
                      type="radio"
                      name={'alignSelf'}
                      value={'stretch'}
                      checked={renderPropsState?.style?.alignSelf === 'stretch'}
                      onChange={handleRenderPropsChange}
                    />
                    Etirer
                  </label>
                </div>
              </form>
            </div>
          </div>
        ) : selectedComponent[0].type === CONTAINER ? (
          <div className="sidebar-options">
            <div className="sidebar-options__header">
              <h4>
                Liste des
                options:
                {' '}
              </h4>
            </div>
            <div className="sidebar-options__body">
              <div
                className="sidebar-options__body__item"
                style={{
                  outline: '2px solid #ccc',
                  padding: '10px',
                  marginTop: '1rem',
                }}
              >
                <h4 style={{
                  marginTop: '0',
                }}
                >
                  Couleur
                </h4>
                <label htmlFor="title">
                  Couleur de fond
                  <input
                    type={'color'}
                    name={'backgroundColor'}
                    value={renderPropsState?.style?.backgroundColor}
                    onChange={handleRenderPropsChange}
                  />

                </label>
                <br />
                <br />
                <label htmlFor="title">
                  Couleur de texte
                  <input
                    type={'color'}
                    name={'color'}
                    value={renderPropsState?.style?.color}
                    onChange={handleRenderPropsChange}
                  />

                </label>

              </div>
              <br />
              <div className="sidebar-options__body__item">
                <form>
                  <div
                    className="sidebar-options__body__item"
                    style={{
                      outline: '2px solid #ccc',
                      padding: '10px',
                    }}
                  >
                    <h4 style={{
                      marginTop: '0',
                    }}
                    >
                      Alignement verticale des colonnes
                    </h4>
                    <label htmlFor="title">
                      <input
                        type="radio"
                        name="alignItems"
                        value="flex-start"
                        checked={renderPropsState?.style?.alignItems === 'flex-start'}
                        onChange={handleRenderPropsChange}
                      />
                      Haut ( par défaut )
                    </label>
                    <br />
                    <label htmlFor="title">
                      <input
                        type="radio"
                        name="alignItems"
                        value="center"
                        checked={renderPropsState?.style?.alignItems === 'center'}
                        onChange={handleRenderPropsChange}
                      />
                      Centre
                    </label>
                    <br />
                    <label htmlFor="title">
                      <input
                        type="radio"
                        name="alignItems"
                        value="flex-end"
                        checked={renderPropsState?.style?.alignItems === 'flex-end'}
                        onChange={handleRenderPropsChange}
                      />
                      Bas
                    </label>
                    <br />
                    <label htmlFor="title">
                      <input
                        type="radio"
                        name="alignItems"
                        value="stretch"
                        checked={renderPropsState?.style?.alignItems === 'stretch'}
                        onChange={handleRenderPropsChange}
                      />
                      Etirer
                    </label>
                    <br />
                    <br />
                    <h4 style={{
                      marginTop: '0',
                    }}
                    >
                      Espacement entre colonnes
                    </h4>
                    <label htmlFor="title">
                      Valeur

                      <input
                        type={'text'}
                        name={'gap'}
                        value={renderPropsState?.style?.gap}
                        onChange={handleRenderPropsChange}
                      />
                    </label>

                  </div>
                  <br />
                  <div
                    className="sidebar-options__body__item"
                    style={{
                      outline: '2px solid #ccc',
                      padding: '10px',
                    }}
                  >
                    <h4 style={{
                      marginTop: '0',
                    }}
                    >
                      Marge intérieurs
                    </h4>
                    <label htmlFor="title">
                      Haut
                      <input
                        type={'text'}
                        name={'paddingTop'}
                        value={renderPropsState?.style?.paddingTop}
                        onChange={handleRenderPropsChange}
                      />

                    </label>
                    <br />
                    <br />
                    <label htmlFor="title">
                      Bas
                      <input
                        type={'text'}
                        name={'paddingBottom'}
                        value={renderPropsState?.style?.paddingBottom}
                        onChange={handleRenderPropsChange}
                      />

                    </label>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : selectedComponent[0].type === SIDEBAR_IMAGE_ITEM ? (
          <div className="sidebar-options">
            <div className="sidebar-options__header">
              <h4>
                Liste des
                options:
                {' '}
              </h4>
            </div>
            <div className="sidebar-options__body">
              <div
                className="sidebar-options__body__item"
                style={{
                  outline: '2px solid #ccc',
                  padding: '10px',
                  marginTop: '1rem',
                }}
              >
                <h4 style={{
                  marginTop: '0',
                }}
                >
                  Image
                </h4>

                <label htmlFor="title">
                  URL de l'image
                  <input
                    type={'text'}
                    name={'src'}
                    value={renderPropsState?.style?.src}
                    onChange={handleRenderPropsChange}
                  />

                </label>
                <br />
                <br />
                {
                  renderPropsState?.style?.src ? (
                    <img
                      src={renderPropsState?.style?.src}
                      alt=""
                      style={{
                        width: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  ) : undefined
                }
                <br />
                <br />
                <h4 style={{
                  marginTop: '0',
                }}
                >
                  Dimensions
                </h4>

                <label htmlFor="title">
                  Hauteur de l'image
                  <input
                    type={'text'}
                    name={'height'}
                    value={renderPropsState?.style?.height}
                    onChange={(e) => {
                      if (renderPropsState?.style?.src === '') {
                        alert('Veuillez d\'abord ajouter une image');
                      } else {
                        handleRenderPropsChange(e);
                      }
                    }}
                  />

                </label>
                <br />
                <br />

                <label htmlFor="title">
                  Adapter la hauteur automatiquement
                  <input
                    type={'checkbox'}
                    name={'height'}
                    checked={renderPropsState?.style?.minHeight === '100%'}
                    disabled={renderPropsState?.style.src === undefined || renderPropsState?.style.src === '' || layout[selectedComponent[0].path.split('-')[0]].children[0].children[selectedComponent[0].path.split('-')[1]].children.length > 1}
                    title={(renderPropsState?.style.src === '' || renderPropsState?.style.src === undefined) ? 'Veuillez d\'abord ajouter une image' : layout[selectedComponent[0].path.split('-')[0]].children[0].children[selectedComponent[0].path.split('-')[1]].children.length > 1 ? 'L\'ajustement automatique de l\'image ne peux être activé que lorsqu\'une seule image compose votre colonne' : undefined}
                    onChange={(e) => {
                      if (renderPropsState?.style.src === '' || renderPropsState?.style.src === undefined) {
                        alert('Veuillez d\'abord ajouter une image');
                      } else {
                        setRenderPropsState({
                          ...renderPropsState,
                          style: {
                            ...renderPropsState?.style,
                            minHeight: e.target.checked ? '100%' : renderPropsState?.style?.height,
                          },
                        });
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
        ) : undefined
      ) : undefined}
    </div>
  );
};
export default SidebarOptions;
